import { COLORS } from "../../colors";
import { BACKGROUND_COLOR_OPTIONS } from "../../components/module/background.options";
import { SPACE_OPTIONS } from "../../components/module/spacing.options";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { HEADING_LEVELS } from "../../types";
import { TAGGABLE_SCHEMAS } from "../../types.sanity";
import { TITLE_SIZE_OPTIONS } from "./resourcefeed.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { FunnelSort } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "module.resourcefeed",
  title: "Resource Feed",
  type: "object",
  icon: () => <FunnelSort weight="thin" />,
  description: "Automatically load a list of resources",
  preview: {
    select: {
      title: "title",
      image: "image",
    },
    prepare({ title = "Resource Feed" }: any) {
      return {
        title: title,
        media: <FunnelSort weight="thin" />,
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
      name: "filter",
      title: "Filter",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "types",
          title: "Types",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: optionsToList(TAGGABLE_SCHEMAS),
          },
        }),
        defineField({
          name: "tags",
          title: "Tags",
          type: "array",
          of: [{ type: "reference", to: [{ type: "page.tag" }] }],
        }),
      ],
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "language",
      group: "language",
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
                  list: optionsToList(HEADING_LEVELS),
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
          name: "tags",
          title: "Tags",
          type: "styles",
          options: {
            fields: [
              {
                name: "display",
                type: "boolean",
              },
            ],
          },
        }),
      ],
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
  ],
});

export default schema;
