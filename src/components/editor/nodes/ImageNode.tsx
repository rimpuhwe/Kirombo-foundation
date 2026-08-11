import * as React from "react";
import { Suspense } from "react";
import {
  DecoratorNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from "lexical";
import ImageComponent from "./ImageComponent";

// Uses nodeName/getAttribute rather than `instanceof HTMLImageElement` so this
// also works when parsing HTML in a headless (non-browser) context, such as
// the one-off migration script, where that global class doesn't exist.
function convertImageElement(domNode: Node): DOMConversionOutput | null {
  if (domNode.nodeName !== "IMG") return null;
  const img = domNode as HTMLImageElement;
  const src = img.getAttribute("src");
  if (!src) return null;
  const altText = img.getAttribute("alt") ?? "";
  const width = img.getAttribute("width");
  const height = img.getAttribute("height");
  return {
    node: $createImageNode({
      src,
      altText,
      width: width ? Number(width) : undefined,
      height: height ? Number(height) : undefined,
    }),
  };
}

export interface ImagePayload {
  src: string;
  altText: string;
  width?: number;
  height?: number;
  key?: NodeKey;
}

export type SerializedImageNode = Spread<
  {
    src: string;
    altText: string;
    width?: number;
    height?: number;
    type: "image";
    version: 1;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<React.ReactElement> {
  __src: string;
  __altText: string;
  __width: "inherit" | number;
  __height: "inherit" | number;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__width, node.__height, node.__key);
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, altText, width, height } = serializedNode;
    return $createImageNode({ src, altText, width, height });
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    if (this.__width !== "inherit") element.setAttribute("width", String(this.__width));
    if (this.__height !== "inherit") element.setAttribute("height", String(this.__height));
    return { element };
  }

  exportJSON(): SerializedImageNode {
    return {
      src: this.__src,
      altText: this.__altText,
      width: this.__width === "inherit" ? undefined : this.__width,
      height: this.__height === "inherit" ? undefined : this.__height,
      type: "image",
      version: 1,
    };
  }

  constructor(
    src: string,
    altText: string,
    width?: "inherit" | number,
    height?: "inherit" | number,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
  }

  createDOM(config: EditorConfig): HTMLElement {
    const div = document.createElement("div");
    const className = config.theme.image as string | undefined;
    if (className) div.className = className;
    return div;
  }

  updateDOM(): false {
    return false;
  }

  setWidthAndHeight(width: "inherit" | number, height: "inherit" | number): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  decorate(): React.ReactElement {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
          nodeKey={this.getKey()}
        />
      </Suspense>
    );
  }
}

export function $createImageNode({ src, altText, width, height, key }: ImagePayload): ImageNode {
  return new ImageNode(src, altText, width, height, key);
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}
