import { HeroBasicProps } from "../../../heroes/HeroBasic";
import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";
import { defineField, defineType } from "sanity";

type SchemaType = SanitySchemaType & {
  type: "object";
  fields: ({
    name: keyof HeroBasicProps | "language" | "preset" | "copyPaste";
  } & SanityFieldType)[];
};

const schema: SchemaType = defineType({
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
    {
      name: "preset",
      title: "Preset",
      type: "preset",
      group: "tools",
      options: {
        updateField: "hero",
      },
    },
    {
      name: "copyPaste",
      title: "Copy Paste",
      type: "copyPaste",
      group: "tools",
      options: {
        updateField: "hero",
      },
    },
    {
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "content",
    },
    {
      name: "title",
      title: "Title",
      type: "text",
      rows: 2,
      group: "content",
    },
    {
      name: "text",
      title: "Text",
      type: "richtext.simple",
      group: "content",
    },
    {
      name: "showLozenges",
      title: "Show Lozenges",
      type: "boolean",
      description: "Sprinkle decorations on the hero.",
      group: "visual",
    },
    {
      name: "visual",
      title: "Visual",
      type: "object",
      group: "visual",
      fields: [
        {
          name: "image2",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "image1",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
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
        },
      ],
    },
    {
      name: "breakOutImage",
      title: "Break out image",
      type: "boolean",
      description: "Make sure the image is a 1200x1200 transparent PNG.",
      group: "visual",
    },
    {
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
    },
  ],
});

export default schema;
