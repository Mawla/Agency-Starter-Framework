import { BackgroundColorType } from "../../../components/module/BackgroundOptions";
import {
  SpaceType,
  SPACE_OPTIONS,
} from "../../../components/module/SpacingOptions";
import { GalleryProps } from "../../../modules/Gallery/Gallery";
import { ColorType } from "../../../types";
import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { optionsToList } from "../../utils/fields/optionsToList";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "object";
  fields: ({
    name: keyof GalleryProps | "language" | "preset" | "copyPaste";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "module.gallery",
  title: "Gallery",
  type: "object",
  icon: () => <DocumentIcon type="gallery" />,
  description: "Photo showcase slider",
  preview: {
    select: {
      title: "title",
      language: "language",
      eyebrow: "eyebrow",
    },
    prepare({ eyebrow = "", title = "Gallery", language }) {
      return {
        title: title,
        subtitle: prefixWithLanguage(language, eyebrow),
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
      type: "text",
      rows: 2,
      group: "content",
    },

    {
      name: "intro",
      title: "Intro",
      type: "richtext.simple",
      group: "content",
    },
    {
      name: "items",
      title: "Items",
      group: "content",
      type: "array",
      of: [
        {
          title: "Item",
          name: "item",
          type: "object",
          preview: {
            select: {
              media: "image",
              title: "image.asset.alt",
            },
          },
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
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
      type: "styles",
      group: "theme",
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
  ],
};

export default schema;
