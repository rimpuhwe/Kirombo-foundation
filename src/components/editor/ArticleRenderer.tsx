import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { editorTheme } from "./theme";
import { ImageNode } from "./nodes/ImageNode";
import "./editor.css";

interface ArticleRendererProps {
  /** Serialized Lexical editor state as stored in Supabase (jsonb -> object, or a JSON string). */
  content: unknown;
}

function onError(error: Error) {
  console.error(error);
}

const ArticleRenderer: React.FC<ArticleRendererProps> = ({ content }) => {
  if (!content) return null;

  const serialized = typeof content === "string" ? content : JSON.stringify(content);

  const initialConfig = {
    namespace: "ArticleRenderer",
    theme: editorTheme,
    onError,
    editable: false,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode, ImageNode, HorizontalRuleNode],
    editorState: serialized,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className="lexical-readonly prose prose-lg max-w-none dark:prose-invert
          prose-headings:font-bold prose-headings:text-foreground
          prose-p:text-foreground/80 prose-p:leading-relaxed
          prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground"
      >
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <LinkPlugin />
      </div>
    </LexicalComposer>
  );
};

export default ArticleRenderer;
