import {
  defaultBlockGroups,
  defaultBlockTheme,
} from "../../components/block/block.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
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
      cmsTitle: "cmsTitle",
    },
    prepare({ title, cmsTitle, html = "< />" }: any) {
      return {
        title: title || cmsTitle || "Code block",
        subtitle: html,
      };
    },
  },
  groups: defaultBlockGroups,
  fields: [
    ...defaultBlockTools,
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "bodyHTML",
      title: "Body HTML",
      type: "text",
      description:
        "Html to be placed in the <body>. Be careful, this is raw HTML and can slow down the website. Use with caution. The HTML will be wrapped in an <iframe> tag.",
      group: "content",
      rows: 10,
    }),
    defineField({
      name: "tailwindConfig",
      title: "Tailwind config",
      type: "text",
      description: "A config that looks like `tailwind.config = {}`",
      group: "content",
      rows: 10,
    }),
    defineField({
      name: "headHTML",
      title: "Head HTML",
      type: "text",
      description:
        "Html to be placed in the <head>. Be careful, this is raw HTML and can slow down the website. Use with caution. The HTML will be wrapped in an <iframe> tag.",
      group: "content",
      rows: 10,
    }),
    defineField({
      name: "baseURL",
      title: "Base URL",
      type: "url",
      description: "The base URL to resolve relative assets in the HTML.",
      group: "content",
    }),

    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defaultBlockTheme,
        defineField({
          name: "code",
          title: "Code",
          type: "styles",
          options: {
            fields: [
              {
                name: "removeWrapper",
                title: "Remove block wrapper",
                type: "boolean",
              },
              {
                name: "removeWebsiteStyles",
                title: "Remove website styles",
                type: "boolean",
              },
              {
                name: "removeTailwindCompiler",
                title: "Remove Tailwind compiler",
                type: "boolean",
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "decorations",
      title: "Decorations",
      type: "decorations",
      group: "decorations",
    }),
  ],
});

export default schema;
