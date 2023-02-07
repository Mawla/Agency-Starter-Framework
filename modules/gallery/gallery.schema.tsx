import { SPACE_OPTIONS } from "../../components/module/spacing.options";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { HEADING_LEVELS } from "../../types";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { VirtualRealityImage } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "module.gallery",
  title: "Gallery",
  type: "object",
  description: "Photo showcase slider",
  icon: () => <VirtualRealityImage weight="thin" />,
  preview: {
    select: {
      title: "title",
      eyebrow: "eyebrow",
    },
    prepare({ eyebrow = "", title = "Gallery" }: any) {
      return {
        title: title,
        subtitle: eyebrow,
        media: () => <VirtualRealityImage weight="thin" />,
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
      name: "language",
      title: "Language",
    },
    {
      name: "tools",
      title: " ",
      icon: EllipsisVerticalIcon,
    },
  ],
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "text",
      rows: 2,
      group: "content",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "portabletext.simple",
      group: "content",
    }),
    defineField({
      name: "items",
      title: "Items",
      group: "content",
      type: "array",
      of: [
        defineField({
          title: "Item",
          name: "item",
          type: "object",
          preview: {
            select: {
              media: "image",
              title: "image.asset.alt",
            },
          },
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "language",
      group: "language",
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defineField({
          name: "module",
          title: "Module",
          type: "styles",
          options: {
            fields: [
              {
                name: "space",
                type: "space",
                options: {
                  list: optionsToList(SPACE_OPTIONS),
                },
              },
            ],
          },
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "styles",
          options: {
            fields: [
              {
                name: "level",
                type: "select",
                options: {
                  list: optionsToList(HEADING_LEVELS),
                },
              },
            ],
          },
        }),
      ],
    }),
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
  ],
});

export default schema;
