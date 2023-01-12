import { MODULE_RADIUS_OPTIONS } from "../../../components/module/BackgroundOptions";
import {
  SpaceType,
  SPACE_OPTIONS,
} from "../../../components/module/SpacingOptions";
import { TextImageProps } from "../../../modules/TextImage/TextImage";
import {
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  IMAGE_ALIGN_OPTIONS,
  IMAGE_COLOR_OPTIONS,
  TITLE_SIZE_OPTIONS,
} from "../../../modules/TextImage/TextImageOptions";
import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { optionsToList } from "../../utils/fields/optionsToList";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "object";
  fields: ({
    name: keyof TextImageProps | "language" | "preset" | "copyPaste";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "module.textimage",
  title: "Text Image",
  type: "object",
  icon: () => <DocumentIcon type="textimage" />,
  description: "50/50 Image  with text",
  preview: {
    select: {
      title: "title",
      language: "language",
      eyebrow: "eyebrow",
      image: "image",
    },
    prepare({ eyebrow = "", title = "Text Image", language, image }) {
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
      name: "intro",
      title: "Intro",
      type: "richtext.simple",
      group: "content",
    },

    {
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
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
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        {
          name: "module",
          title: "Module",
          type: "object",
          fields: [
            {
              name: "space",
              type: "string",
              options: {
                list: optionsToList(SPACE_OPTIONS),
              },
            },
            {
              name: "background",
              type: "string",
              components: {
                input: (props) => <div>foo{props.title}</div>,
              },
              options: {
                list: optionsToList(BACKGROUND_COLOR_OPTIONS),
              },
            },
          ],
        },
        {
          name: "image",
          title: "Image",
          type: "object",
          fields: [
            {
              name: "background",
              type: "string",
              options: {
                list: optionsToList(IMAGE_COLOR_OPTIONS),
              },
            },
            {
              name: "align",
              type: "string",
              options: {
                list: optionsToList(IMAGE_ALIGN_OPTIONS),
              },
            },
          ],
        },
        {
          name: "title",
          title: "Title",
          type: "object",
          fields: [
            {
              name: "size",
              type: "string",
              options: {
                list: optionsToList(TITLE_SIZE_OPTIONS),
              },
            },
          ],
        },
        {
          name: "decorations",
          title: "Decorations",
          type: "object",
          fields: [
            {
              name: "showLozenges",
              title: "Show Lozenges",
              type: "boolean",
            },
            {
              name: "roundedTop",
              type: "string",
              title: "Rounded top",
              options: {
                list: optionsToList(MODULE_RADIUS_OPTIONS),
              },
            },
            {
              name: "roundedBottom",
              type: "string",
              title: "Rounded bottom",
              options: {
                list: optionsToList(MODULE_RADIUS_OPTIONS),
              },
            },
          ],
        },
      ],
    },
  ],
};

export default schema;
