import React from "react";
import { PortableTextChild } from "sanity";

export const shouldRenderPortableText = (body: any) => {
  const isStringOrArrayOrReactElement =
    typeof body === "string" ||
    Array.isArray(body) ||
    React.isValidElement(body);

  if (!isStringOrArrayOrReactElement) return false;

  if (typeof body === "string") return Boolean(body.trim().length);

  if (React.isValidElement(body)) return true;

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
