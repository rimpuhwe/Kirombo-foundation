import xss from "xss";

export const validatePost = (data: any) => {
  const errors: Record<string, string> = {};

  if (!data.title || typeof data.title !== "string" || data.title.trim().length === 0) {
    errors.title = "Title is required and must be a non-empty string";
  }

  if (data.title && data.title.length > 255) {
    errors.title = "Title must be less than 255 characters";
  }

  if (!data.description || typeof data.description !== "string") {
    errors.description = "Description is required";
  }

  if (!data.content || typeof data.content !== "string" || data.content.trim().length === 0) {
    errors.content = "Content is required and must be a non-empty string";
  }

  if (data.status && !["DRAFT", "PUBLISHED"].includes(data.status)) {
    errors.status = "Status must be either DRAFT or PUBLISHED";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const sanitizeHtml = (html: string): string => {
  return xss(html, {
    whiteList: {
      b: [],
      i: [],
      em: [],
      strong: [],
      a: ["href", "title"],
      p: [],
      br: [],
      ul: [],
      ol: [],
      li: [],
      blockquote: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      img: ["src", "alt", "width", "height"],
      table: [],
      thead: [],
      tbody: [],
      tr: [],
      td: [],
      th: [],
      div: ["class"],
      span: ["class"],
      code: [],
      pre: [],
    },
    stripIgnoredTag: true,
    stripLeakage: true,
  });
};
