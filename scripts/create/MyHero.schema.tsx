import { BACKGROUND_COLOR_OPTIONS } from "../../components/module/background.options";
import { prefixWithLanguage } from "../../studio/utils/language/prefix-with-language";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { ImageGallery } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "MyHeroSchema",
  title: "MyHero",
  type: "object",
  icon: () => <ImageGallery weight="thin" />,
  description: "/*DESCRIPTION*/",
  preview: {
    select: {
      title: "title",
      language: "language",
      image: "image",
    },
    prepare({ title = "MyHero", language }: any) {
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
      options: {
        updateField: "hero",
      },
    }),
    defineField({
      name: "copyPaste",
      title: "Copy Paste",
      type: "copyPaste",
      group: "tools",
      options: {
        updateField: "hero",
      },
    }),
    /*FIELDS*/
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
                name: "background",
                type: "color",
                options: {
                  colors: BACKGROUND_COLOR_OPTIONS,
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
