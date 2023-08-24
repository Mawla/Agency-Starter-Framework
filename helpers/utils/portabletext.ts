import { PortableTextChild } from "sanity";

export const shouldRenderPortableText = (body: any) => {
  if (!Array.isArray(body)) return true;

  if (body.length === 0) return false;

  const str = body
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return `[${block._type}]`;
      }
      return block.children
        .map((child: PortableTextChild) => (child.text as string).trim())
        .join("");
    })
    .join("");

  return Boolean(str.length);
};
