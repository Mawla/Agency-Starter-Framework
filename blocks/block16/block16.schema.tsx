import {
  defaultBlockTheme,
  defaultBlockGroups,
} from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { SocialLogo } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block16",
  title: "Logo grid",
  type: "object",
  icon: () => <SocialLogo weight="thin" />,
  description: "Displays a list of logos",
  preview: {
    select: {
      title: "title",
      cmsTitle: "cmsTitle",
    },
    prepare({ title, cmsTitle }: any) {
      return {
        title: title || cmsTitle || "Logo grid",
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
      title: "Logos",
      type: "array",
      description: "List of logos",
      group: ["content"],
      of: [
        defineField({
          title: "Item",
          name: "item",
          type: "object",
          preview: {
            select: {
              title: "title",
              media: "image",
            },
          },
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              description: "Image height 48px, width variable",
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
