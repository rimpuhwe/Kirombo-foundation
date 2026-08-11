import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  type NodeKey,
} from "lexical";
import { $isImageNode } from "./ImageNode";

interface ImageComponentProps {
  src: string;
  altText: string;
  width: "inherit" | number;
  height: "inherit" | number;
  nodeKey: NodeKey;
}

const MIN_WIDTH = 100;

const ImageComponent: React.FC<ImageComponentProps> = ({ src, altText, width, height, nodeKey }) => {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const editable = editor.isEditable();

  const onDelete = useCallback(
    (event: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isImageNode(node)) node.remove();
      }
      return false;
    },
    [isSelected, nodeKey]
  );

  useEffect(() => {
    if (!editable) return;
    return mergeRegister(
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (event) => {
          if (event.target === imageRef.current) {
            clearSelection();
            setSelected(true);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW)
    );
  }, [clearSelection, editable, editor, onDelete, setSelected]);

  const startResize = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const img = imageRef.current;
    if (!img) return;

    const startX = event.clientX;
    const startWidth = img.getBoundingClientRect().width;
    const ratio = img.naturalHeight / img.naturalWidth || 1;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(MIN_WIDTH, startWidth + (moveEvent.clientX - startX));
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if ($isImageNode(node)) node.setWidthAndHeight(newWidth, newWidth * ratio);
      });
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className={`relative inline-block my-2 max-w-full rounded-lg ${
        isSelected && editable ? "outline outline-2 outline-primary" : ""
      }`}
    >
      <img
        ref={imageRef}
        src={src}
        alt={altText}
        draggable={false}
        style={{
          width: width === "inherit" ? "100%" : `${width}px`,
          height: height === "inherit" ? "auto" : `${height}px`,
          maxWidth: "100%",
        }}
        className="rounded-lg block"
      />
      {isSelected && editable && (
        <div
          onMouseDown={startResize}
          className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary rounded-sm cursor-se-resize translate-x-1/2 translate-y-1/2 border-2 border-white"
        />
      )}
    </div>
  );
};

export default ImageComponent;
