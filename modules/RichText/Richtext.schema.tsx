import { MODULE_RADIUS_OPTIONS } from "../../components/module/background.options";
import { SPACE_OPTIONS } from "../../components/module/spacing.options";
import { WIDTH_OPTIONS } from "../../components/module/width.options";
import { DocumentIcon } from "../../studio/utils/DocumentIcon";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { prefixWithLanguage } from "../../studio/utils/language/prefix-with-language";
import { blocksToText } from "../../studio/utils/portableText/portableTextToText";
import { HEADING_LEVELS } from "../../types";
import {
  BACKGROUND_COLOR_OPTIONS,
  TEXT_ALIGN_OPTIONS,
  TITLE_SIZE_OPTIONS,
} from "./richtext.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "module.richtext",
  title: "Rich text",
  type: "object",
  description: "Generic content module with headings, images etc.",
  icon: () => <DocumentIcon type="page" />,
  preview: {
    select: {
      title: "title",
      eyebrow: "eyebrow",
      content: "content",
      language: "language",
    },
    prepare({ eyebrow = "", title = "", content = [], language }: any) {
      return {
        title: [eyebrow, title, blocksToText(content)].join(" "),
        subtitle: prefixWithLanguage(language, blocksToText(content)),
        media: () => <DocumentIcon type="page" />,
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
      type: "portabletext.full",
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
              {
                name: "align",
                type: "select",
                options: {
                  list: optionsToList(TEXT_ALIGN_OPTIONS),
                },
              },
              {
                name: "width",
                type: "select",
                options: {
                  list: optionsToList(WIDTH_OPTIONS),
                },
              },
              {
                name: "pullUp",
                type: "boolean",
                title: "Pull next module up",
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
