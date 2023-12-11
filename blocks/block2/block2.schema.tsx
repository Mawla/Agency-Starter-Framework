import {
  defaultBlockGroups,
  defaultBlockTheme,
} from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
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
      cmsTitle: "cmsTitle",
    },
    prepare({ title, cmsTitle }: any) {
      return {
        title: title || cmsTitle || "Feature section with icons",
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
              media: "image",
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
              },
            ],
          },
        }),
        defaultTitleTheme,
        defaultTextTheme,
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
