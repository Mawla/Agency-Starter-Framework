import { htmlToBlocks } from "@sanity/block-tools";
import { nanoid } from "nanoid";
import React, { ComponentType } from "react";
import { PortableTextInput } from "sanity";

export const CustomRichTextEditor: ComponentType<any> = React.forwardRef(
  (props, ref) => {
    return <PortableTextInput {...props} onPaste={handlePaste} />;
  },
);

function handlePaste(props: {
  event: React.ClipboardEvent;
  type: { [key: string]: any };
  value: any[];
  path: any[];
}) {
  const { event, type, path } = props;

  const html = event.clipboardData.getData("text/html");

  if (html) {
    const blocks = htmlToBlocks(html, type as any, {
      rules: [
        {
          deserialize(el: Node, next, block) {
            let element = el as HTMLElement;
            if (element?.tagName?.toLowerCase() != "a") return undefined;

            const href = element.getAttribute("href");

            if (!href) {
              return next(el.childNodes);
            }

            const markDef = {
              _key: nanoid(),
              _type: "link",
              external: href,
            };
            return {
              _type: "__annotation",
              markDef: markDef,
              children: next(el.childNodes),
            };
          },
        },
      ],
    });
    // return an insert patch
    return { insert: blocks, path };
  }
  return undefined;
}
