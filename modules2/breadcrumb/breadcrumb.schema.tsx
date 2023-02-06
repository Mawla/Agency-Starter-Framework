import { SPACE_OPTIONS } from "../../components/module/spacing.options";
import { DocumentIcon } from "../../studio/utils/DocumentIcon";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { prefixWithLanguage } from "../../studio/utils/language/prefix-with-language";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "module.breadcrumb",
  title: "Breadcrumb",
  type: "object",
  description: "Navigation path",
  icon: () => <DocumentIcon type="breadcrumb" />,
  initialValue: {
    theme: {
      background: "white",
      text: "black",
    },
  },
  preview: {
    select: {
      title: "title",
      language: "language",
    },
    prepare({ title = "Breadcrumb", language }: any) {
      return {
        title: title,
        subtitle: prefixWithLanguage(language),
        media: () => <DocumentIcon type="breadcrumb" />,
      };
    },
  },
  groups: [
    {
      name: "theme",
      title: "Theme",
      default: true,
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
      name: "theme",
      title: "Theme",
      type: "styles",
      group: "theme",
      options: {
        fields: [
          {
            name: "text",
            title: "Text",
            type: "color",
          },
          {
            name: "background",
            title: "Background",
            type: "color",
          },
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
  ],
});

export default schema;
