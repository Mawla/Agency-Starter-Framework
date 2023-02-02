import { COLORS } from "../../colors";
import { BACKGROUND_COLOR_OPTIONS } from "../../components/module/BackgroundOptions";
import { SPACE_OPTIONS } from "../../components/module/SpacingOptions";
import { DocumentIcon } from "../../studio/utils/DocumentIcon";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { prefixWithLanguage } from "../../studio/utils/language/prefix-with-language";
import { HEADING_LEVELS } from "../../types";
import { TITLE_SIZE_OPTIONS } from "./MyModuleOptions";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "MyModuleSchema",
  title: "MyModuleTitle",
  type: "object",
  icon: () => <DocumentIcon type="image" />,
  description: "/*DESCRIPTION*/",
  preview: {
    select: {
      title: "title",
      language: "language",
      image: "image",
    },
    prepare({ title = "MyModuleTitle", language }: any) {
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
    /*FIELDS*/
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
                  list: HEADING_LEVELS,
                },
              },
              {
                name: "color",
                type: "color",
                options: {
                  colors: COLORS,
                },
              },
            ],
          },
        }),
        defineField({
          name: "text",
          title: "Text",
          type: "styles",
          options: {
            fields: [
              {
                name: "color",
                type: "color",
                options: {
                  colors: COLORS,
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
