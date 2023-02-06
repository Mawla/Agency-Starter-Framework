import { SPACE_OPTIONS } from "../../components/module/SpacingOptions";
import { DocumentIcon } from "../../studio/utils/DocumentIcon";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { prefixWithLanguage } from "../../studio/utils/language/prefix-with-language";
import { HEADING_LEVELS } from "../../types";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "module.slides",
  title: "Slides",
  type: "object",
  icon: () => <DocumentIcon type="slides" />,
  description: "Slider used for presentation of image, title and text",
  preview: {
    select: {
      title: "title",
      language: "language",
    },
    prepare({ title = "Slides", language }: any) {
      return {
        title: title,
        subtitle: prefixWithLanguage(language),
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
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 2,
            }),
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
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "language",
      group: "language",
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
  ],
});

export default schema;
