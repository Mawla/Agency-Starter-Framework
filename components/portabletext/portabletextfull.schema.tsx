import { baseLanguage } from "../../languages";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { blocksToText } from "../../studio/utils/portableText/portableTextToText";
import { DIRECTION_OPTIONS } from "../buttons/buttongroup.options";
import { SCRIPT_REFERENCE_FIELD } from "../script/script.schema";
import richTextBasicSchema from "./portabletextbasic.schema";
import { Chain, MessagingLines, Tables } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField } from "sanity";

export default defineField({
  name: "portabletext.full",
  title: "Rich Text",
  type: "array",
  of: [
    {
      type: "block",
      title: "Rich text",
      styles: [
        ...(richTextBasicSchema.of[0] as any).styles,
        { title: "H1", value: "h1" },
        { title: "H5", value: "h5" },
      ].sort((a, b) => a.title.localeCompare(b.title)),
      lists: [...(richTextBasicSchema.of[0] as any).lists],
      marks: {
        decorators: [...(richTextBasicSchema.of[0] as any).marks.decorators],
        annotations: [...(richTextBasicSchema.of[0] as any).marks.annotations],
      },
    },
    { type: "image.simple" },
    { type: "video" },
    {
      name: "buttons",
      title: "Buttons",
      type: "object",
      groups: [
        {
          name: "theme",
          title: "Theme",
        },
      ],
      preview: {
        select: {
          items: "items",
        },
        prepare({ items }: any) {
          return {
            title: "Button group",
            subtitle:
              items?.map(({ label }: { label: string }) => label).join(", ") ||
              "",
            media: <Chain weight="thin" />,
          };
        },
      },
      fields: [
        { type: "buttongroup", name: "items" },
        {
          name: "direction",
          title: "Direction",
          type: "string",
          group: "theme",
          initialValue: "horizontal",
          options: {
            layout: "radio",
            direction: "horizontal",
            list: optionsToList(DIRECTION_OPTIONS),
          },
        },
      ],
    },
    {
      type: "object",
      name: "csv",
      title: "CSV",
      icon: () => <Tables weight="thin" />,
      preview: {
        select: {
          file: "file.asset.url",
          filename: "file.asset.originalFilename",
        },
        prepare({ file, filename }: any) {
          return {
            title: filename,
            subtitle: file,
          };
        },
      },
      fields: [
        {
          name: "file",
          title: "CSV file",
          type: "file",
          options: { accept: "text/csv" },
        },
      ],
    },
    SCRIPT_REFERENCE_FIELD,
    {
      name: "testimonials",
      title: "Testimonials",
      type: "object",
      icon: () => <MessagingLines weight="thin" />,
      preview: {
        select: {
          items0Name: "items.0.name",
          items0Content: "items.0.content",
          items1Name: "items.1.name",
          items1Content: "items.1.content",
          items2Name: "items.2.name",
          items2Content: "items.2.content",
        },
        prepare({
          items0Name,
          items0Content,
          items1Name,
          items1Content,
          items2Name,
          items2Content,
        }) {
          const items = [];
          items[0] = [items0Name, blocksToText(items0Content)];
          items[1] = [items1Name, blocksToText(items1Content)];
          items[2] = [items2Name, blocksToText(items2Content)];

          return {
            title: "Testimonials",
            subtitle: items
              .map((item) => item.filter((i) => i).join(" - "))
              .join(" "),
          };
        },
      },
      fields: [
        defineField({
          name: "items",
          title: "Items",
          type: "testimonials.list",
        }),
      ],
    },
  ],
});
