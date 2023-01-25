import { SPACE_OPTIONS } from "../../../components/module/SpacingOptions";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { optionsToList } from "../../utils/fields/optionsToList";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "module.gallery",
  title: "Gallery",
  type: "object",
  description: "Photo showcase slider",
  icon: () => <DocumentIcon type="gallery" />,
  preview: {
    select: {
      title: "title",
      language: "language",
      eyebrow: "eyebrow",
    },
    prepare({ eyebrow = "", title = "Gallery", language }: any) {
      return {
        title: title,
        subtitle: prefixWithLanguage(language, eyebrow),
        media: () => <DocumentIcon type="gallery" />,
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
      type: "richtext.simple",
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
      type: "styles",
      group: "theme",
      options: {
        fields: [
          defineField({
            name: "space",
            title: "Space",
            type: "space",
            options: {
              list: optionsToList(SPACE_OPTIONS),
            },
          }),
        ],
      },
    }),
  ],
});

export default schema;
