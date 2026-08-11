import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import type { EditorState } from "lexical";
import { editorTheme } from "./theme";
import { ImageNode } from "./nodes/ImageNode";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import "./editor.css";

interface EditorProps {
  initialContent?: string | null;
  onChange: (json: string) => void;
}

function onError(error: Error) {
  console.error(error);
}

const Editor: React.FC<EditorProps> = ({ initialContent, onChange }) => {
  const initialConfig = {
    namespace: "ArticleEditor",
    theme: editorTheme,
    onError,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode, ImageNode, HorizontalRuleNode],
    editorState: initialContent || undefined,
  };

  const handleChange = (editorState: EditorState) => {
    onChange(JSON.stringify(editorState.toJSON()));
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="lexical-editor-shell border border-border rounded-lg overflow-hidden">
        <ToolbarPlugin />
        <div className="relative bg-background">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="lexical-content-editable min-h-[400px] px-5 py-4 focus:outline-none prose prose-lg max-w-none dark:prose-invert" />
            }
            placeholder={
              <div className="pointer-events-none absolute top-4 left-5 text-muted-foreground select-none">
                Start writing your article...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoFocusPlugin />
          <HorizontalRulePlugin />
          <ImagesPlugin />
          <OnChangePlugin onChange={handleChange} ignoreSelectionChange />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Editor;
