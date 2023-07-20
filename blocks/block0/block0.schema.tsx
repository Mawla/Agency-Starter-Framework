import { defaultBlockTheme } from "../../components/block/block.schema";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { Programming } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block0",
  title: "Code",
  type: "object",
  icon: () => <Programming weight="thin" />,
  description: "Free form HTML block",
  preview: {
    select: {
      title: "title",
      html: "html",
    },
    prepare({ title = "Code block", html = "< />" }: any) {
      return {
        title: title,
        subtitle: html,
      };
    },
  },
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "theme",
      title: "Theme",
    },
    {
      name: "tools",
      title: " ",
      icon: EllipsisVerticalIcon,
    },
  ],
  fields: [
    defineField({
      name: "preset",
      title: "Preset",
      type: "preset",
      group: "tools",
    }),
    defineField({
      name: "copyPaste",
      title: "Copy Paste",
      type: "copyPaste",
      group: "tools",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "html",
      title: "HTML",
      type: "text",
      description:
        "Be careful, this is raw HTML and can slow down the website. Use with caution. The HTML will be wrapped in an <iframe> tag.",
      group: "content",
      rows: 10,
    }),

    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [defaultBlockTheme],
    }),
  ],
});

export default schema;
