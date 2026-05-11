import DOMPurify from "isomorphic-dompurify";

/** Sanitize CMS HTML before rendering with dangerouslySetInnerHTML */
export function sanitizeRichTextHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
}
