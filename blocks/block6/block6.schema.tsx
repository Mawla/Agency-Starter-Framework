import {
  defaultBlockGroups,
  defaultBlockTheme,
} from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { StarSquare } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block6",
  title: "Default feature list",
  type: "object",
  icon: () => <StarSquare weight="thin" />,
  description:
    "Grid layout where you can show up to three items on a row featuring an icon, title and description.",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title = "Default feature list" }: any) {
      return {
        title: title,
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
              type: "portabletext.full",
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
      fields: [defaultBlockTheme, defaultTitleTheme, defaultTextTheme],
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
