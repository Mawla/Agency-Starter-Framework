import { MODULE_RADIUS_OPTIONS } from "../../components/module/background.options";
import { SPACE_OPTIONS } from "../../components/module/spacing.options";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { prefixWithLanguage } from "../../studio/utils/language/prefix-with-language";
import { HEADING_LEVELS } from "../../types";
import {
  BACKGROUND_COLOR_OPTIONS,
  IMAGE_ALIGN_OPTIONS,
  TITLE_SIZE_OPTIONS,
} from "./textimage.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { LayoutHalfVertical } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "module.textimage",
  title: "Text Image",
  type: "object",
  icon: () => <LayoutHalfVertical weight="thin" />,
  description: "50/50 Image  with text",
  preview: {
    select: {
      title: "title",
      language: "language",
      eyebrow: "eyebrow",
      image: "image",
    },
    prepare({ eyebrow = "", title = "Text Image", language, image }: any) {
      return {
        title: title,
        subtitle: prefixWithLanguage(language, eyebrow),
        media: image ? image : () => <LayoutHalfVertical weight="thin" />,
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
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
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
                title: "Space",
                type: "space",
                options: {
                  list: optionsToList(SPACE_OPTIONS),
                },
              },
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
        defineField({
          name: "image",
          title: "Image",
          type: "styles",
          options: {
            fields: [
              {
                name: "align",
                type: "select",
                options: {
                  list: optionsToList(IMAGE_ALIGN_OPTIONS),
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
                name: "size",
                type: "select",
                options: {
                  list: optionsToList(TITLE_SIZE_OPTIONS),
                },
              },
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
          name: "decorations",
          title: "Decorations",
          type: "styles",
          options: {
            fields: [
              {
                name: "roundedTop",
                type: "select",
                title: "Rounded top",
                options: {
                  list: optionsToList(MODULE_RADIUS_OPTIONS),
                },
              },
              {
                name: "roundedBottom",
                type: "select",
                title: "Rounded bottom",
                options: {
                  list: optionsToList(MODULE_RADIUS_OPTIONS),
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
