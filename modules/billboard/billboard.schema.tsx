import { SPACE_OPTIONS } from "../../components/module/spacing.options";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { HEADING_LEVELS } from "../../types";
import { ALIGN_OPTIONS } from "./billboard.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { ImageGallery } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "module.billboard",
  title: "Billboard",
  type: "object",
  icon: () => <ImageGallery weight="thin" />,
  initialValue: {},
  description: "Display large image with text",
  preview: {
    select: {
      title: "title",
      eyebrow: "eyebrow",
      image: "image",
    },
    prepare({ eyebrow = "", title = "Billboard", image }: any) {
      return {
        title: title,
        subtitle: eyebrow,
        media: image,
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
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "portabletext.simple",
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
      description: "Square image. Preferred size: 1200x1200",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
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
                title: "Space",
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
        defineField({
          name: "image",
          title: "Image",
          type: "styles",
          options: {
            fields: [
              {
                name: "align",
                title: "Align",
                type: "select",
                options: {
                  list: optionsToList(ALIGN_OPTIONS),
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
