import type { EditorThemeClasses } from "lexical";

export const editorTheme: EditorThemeClasses = {
  paragraph: "mb-3 leading-relaxed last:mb-0",
  heading: {
    h1: "text-3xl font-bold mt-6 mb-3",
    h2: "text-2xl font-bold mt-5 mb-3",
    h3: "text-xl font-bold mt-4 mb-2",
  },
  quote: "border-l-4 border-primary pl-4 italic text-muted-foreground my-4",
  list: {
    ul: "list-disc list-inside mb-3 space-y-1",
    ol: "list-decimal list-inside mb-3 space-y-1",
    listitem: "ml-2",
  },
  link: "text-primary underline hover:no-underline cursor-pointer",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
  },
  image: "editor-image",
  hr: "my-6 border-t border-border",
};
