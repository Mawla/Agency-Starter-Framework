import { PortableTextChild } from "sanity";

export const shouldRenderPortableText = (body: any) => {
  const isStringOrArray = typeof body === "string" || Array.isArray(body);

  if (!isStringOrArray) return false;

  if (typeof body === "string") return Boolean(body.trim().length);

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
