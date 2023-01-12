import { SPACE_OPTIONS } from "../../../components/module/SpacingOptions";
import { BillboardProps } from "../../../modules/Billboard/Billboard";
import { ALIGN_OPTIONS } from "../../../modules/Billboard/BillboardOptions";
import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { optionsToList } from "../../utils/fields/optionsToList";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "object";
  initialValue: {
    theme?: BillboardProps["theme"];
  };
  fields: ({
    name: keyof BillboardProps | "language" | "preset" | "copyPaste";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "module.billboard",
  title: "Billboard",
  type: "object",
  icon: () => <DocumentIcon type="image" />,
  initialValue: {},
  description: "Display large image with text",
  preview: {
    select: {
      title: "title",
      language: "language",
      eyebrow: "eyebrow",
      image: "image",
    },
    prepare({ eyebrow = "", title = "Gallery", language, image }) {
      return {
        title: title,
        subtitle: prefixWithLanguage(language, eyebrow),
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
    {
      name: "language",
      title: "Language",
      type: "language",
      group: "language",
    },
    {
      name: "preset",
      title: "Preset",
      type: "preset",
      group: "tools",
    },
    {
      name: "copyPaste",
      title: "Copy Paste",
      type: "copyPaste",
      group: "tools",
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
      type: "string",
      group: "content",
    },
    {
      name: "content",
      title: "Content",
      type: "richtext.simple",
      group: "content",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
      description: "Square image. Preferred size: 1200x1200",
      options: {
        hotspot: true,
      },
    },
    {
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
    },
    {
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        {
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
        },
        {
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
        },
      ],
    },
  ],
};

export default schema;
