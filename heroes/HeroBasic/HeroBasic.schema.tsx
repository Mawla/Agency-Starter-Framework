import { DocumentIcon } from "../../studio/utils/DocumentIcon";
import { prefixWithLanguage } from "../../studio/utils/language/prefix-with-language";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "hero.basic",
  title: "Hero Basic",
  type: "object",
  icon: () => <DocumentIcon type="image" />,
  preview: {
    select: {
      title: "title",
      eyebrow: "eyebrow",
      image1: "visual.image1",
      image2: "visual.image2",
      language: "language",
    },
    prepare({ title = "", eyebrow = "", image1, image2, language }: any) {
      return {
        title: `${title}`,
        subtitle: prefixWithLanguage(language, eyebrow),
        media: image1 || image2,
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
      name: "visual",
      title: "Visual",
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
      name: "text",
      title: "Text",
      type: "richtext.simple",
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "visual",
      title: "Visual",
      type: "object",
      group: "visual",
      fields: [
        defineField({
          name: "image2",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "image1",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "colors",
          title: "Colors",
          type: "styles",
          options: {
            fields: [
              {
                name: "color1",
                title: "Color 1",
                type: "color",
              },
              {
                name: "color2",
                title: "Color 2",
                type: "color",
              },
              {
                name: "color3",
                title: "Color 3",
                type: "color",
              },
              {
                name: "color4",
                title: "Color 4",
                type: "color",
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "breakOutImage",
      title: "Break out image",
      type: "boolean",
      description: "Make sure the image is a 1200x1200 transparent PNG.",
      group: "visual",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
    }),
  ],
});

export default schema;
