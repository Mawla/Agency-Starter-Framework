import { COLUMN_OPTIONS } from "../../blocks/block18/block18.options";
import { defaultBlockGroups } from "../../components/block/block.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { blocksToText } from "../../studio/utils/portableText/portableTextToText";
import {
  BORDER_RADIUS_OPTIONS,
  BORDER_WIDTH_OPTIONS,
  HORIZONTAL_ALIGN_OPTIONS,
  PADDING_OPTIONS,
  RATIOS,
} from "../../types";
import { IMAGE_HEIGHT_OPTIONS } from "./composablecard.options";
import { Postcard } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "card.composable",
  title: "Composable card",
  type: "object",
  icon: () => <Postcard weight="thin" />,
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      content: "content",
      image: "image",
    },
    prepare({ title = "", subtitle = "", content, image }) {
      return {
        title: `${title} ${subtitle}`,
        subtitle: blocksToText(content),
        media: image,
      };
    },
  },
  groups: defaultBlockGroups,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Image that can be sized, rounded and positioned.",
      group: "content",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "text",
      group: "content",
      rows: 2,
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      group: "content",
      rows: 2,
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "portabletext.basic",
      group: "content",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defineField({
          name: "card",
          type: "styles",
          options: {
            fields: [
              defineField({
                name: "color",
                title: "Text color",
                type: "color",
              }),
              defineField({
                name: "background",
                type: "color",
              }),

              defineField({
                name: "align",
                type: "select",
                options: {
                  list: optionsToList(HORIZONTAL_ALIGN_OPTIONS),
                },
              }),
              {
                name: "paddingX",
                type: "select",
                options: {
                  list: optionsToList(PADDING_OPTIONS, true),
                },
              },
              {
                name: "paddingTop",
                type: "select",
                options: {
                  list: optionsToList(PADDING_OPTIONS, true),
                },
              },
              {
                name: "paddingBottom",
                type: "select",
                options: {
                  list: optionsToList(PADDING_OPTIONS, true),
                },
              },
              {
                name: "columns",
                type: "select",
                options: {
                  list: optionsToList(COLUMN_OPTIONS),
                },
              },
            ],
          },
        }),
        defineField({
          name: "border",
          title: "Border",
          type: "styles",
          options: {
            fields: [
              {
                name: "color",
                type: "color",
              },
              {
                name: "width",
                type: "select",
                options: {
                  list: optionsToList(BORDER_WIDTH_OPTIONS),
                },
              },
              {
                name: "radius",
                type: "select",
                options: {
                  list: optionsToList(BORDER_RADIUS_OPTIONS),
                },
              },
            ],
          },
        }),
        defaultTitleTheme,
        { ...defaultTitleTheme, name: "subtitle" },
        { ...defaultTitleTheme, name: "content" },
        defineField({
          name: "image",
          type: "styles",
          options: {
            fields: [
              defineField({
                name: "ratio",
                type: "select",
                options: {
                  list: optionsToList(RATIOS),
                },
              }),
              defineField({
                name: "height",
                type: "select",
                options: {
                  list: optionsToList(IMAGE_HEIGHT_OPTIONS),
                },
              }),
              defineField({
                name: "rounded",
                type: "select",
                options: {
                  list: optionsToList(BORDER_RADIUS_OPTIONS),
                },
              }),
            ],
          },
        }),
        defineField({
          name: "buttons",
          type: "styles",
          options: {
            fields: [
              defineField({
                name: "hidden",
                type: "boolean",
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "decorations",
      title: "Decorations",
      type: "decorations",
      group: "decorations",
    }),
  ],
});

export default schema;
