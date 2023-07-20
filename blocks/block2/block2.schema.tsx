import { defaultBlockTheme } from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { BACKGROUND_COLOR_OPTIONS } from "./block2.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { TopVerticalLayout } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block2",
  title: "Feature section with icons",
  type: "object",
  icon: () => <TopVerticalLayout weight="thin" />,
  description: "Feature section with icons",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title = "Block 2" }: any) {
      return {
        title: title,
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
      name: "intro",
      title: "Intro",
      type: "portabletext.simple",
      group: "content",
    }),

    defineField({
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      description: "List of items",
      group: ["content"],
      of: [
        defineField({
          title: "Item",
          name: "item",
          type: "object",
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
          ],
          preview: {
            select: {
              title: "title",
            },
          },
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              group: "content",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              group: "content",
            }),
            defineField({
              name: "intro",
              title: "Intro",
              type: "portabletext.simple",
              group: "content",
            }),
            defineField({
              name: "theme",
              title: "Theme",
              type: "object",
              group: "theme",
              fields: [defaultTitleTheme, defaultTextTheme],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defaultBlockTheme,
        defineField({
          name: "items",
          title: "Items",
          type: "styles",
          options: {
            fields: [
              {
                name: "background",
                type: "color",
                options: {
                  colors: BACKGROUND_COLOR_OPTIONS,
                },
              },
            ],
          },
        }),
        defaultTitleTheme,
        defaultTextTheme,
      ],
    }),
  ],
});

export default schema;
