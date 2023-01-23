import { MODULE_RADIUS_OPTIONS } from "../../../components/module/BackgroundOptions";
import { SPACE_OPTIONS } from "../../../components/module/SpacingOptions";
import { WIDTH_OPTIONS } from "../../../components/module/WidthOptions";
import { RichTextProps } from "../../../modules/RichText/RichText";
import {
  BACKGROUND_COLOR_OPTIONS,
  TEXT_ALIGN_OPTIONS,
  TITLE_SIZE_OPTIONS,
} from "../../../modules/RichText/RichTextOptions";
import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { optionsToList } from "../../utils/fields/optionsToList";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import { blocksToText } from "../../utils/portableText/portableTextToText";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "object";
  fields: ({
    name: keyof RichTextProps | "language" | "preset" | "copyPaste";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "module.richtext",
  title: "Rich text",
  type: "object",
  description: "Generic content module with headings, images etc.",
  preview: {
    select: {
      title: "title",
      eyebrow: "eyebrow",
      content: "content",
      language: "language",
    },
    prepare({ eyebrow = "", title = "", content = [], language }) {
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
      type: "richtext.full",
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
        },
        {
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
            ],
          },
        },
        {
          name: "decorations",
          title: "Decorations",
          type: "styles",
          options: {
            fields: [
              {
                name: "showOnes",
                title: "Show ones",
                type: "boolean",
              },
              {
                name: "showLozenges",
                title: "Show lozenges",
                type: "boolean",
              },
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
        },
      ],
    },
  ],
};

export default schema;
