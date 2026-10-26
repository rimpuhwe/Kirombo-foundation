import { useEffect } from "react";

/**
 * Custom hook to set the document title.
 * @param title The title to set for the document.
 */
export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
