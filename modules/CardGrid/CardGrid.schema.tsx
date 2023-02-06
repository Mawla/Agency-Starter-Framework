import { MODULE_RADIUS_OPTIONS } from "../../components/module/background.options";
import { SPACE_OPTIONS } from "../../components/module/spacing.options";
import { SLIDER_COLOR_OPTIONS } from "../../components/slider/slider.options";
import { DocumentIcon } from "../../studio/utils/DocumentIcon";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { prefixWithLanguage } from "../../studio/utils/language/prefix-with-language";
import { HEADING_LEVELS } from "../../types";
import {
  ALIGN_OPTIONS,
  BACKGROUND_COLOR_OPTIONS,
  BUTTON_POSITION_OPTIONS,
  COLUMN_OPTIONS,
  GAP_OPTIONS,
  TITLE_SIZE_OPTIONS,
} from "./cardgrid.options";
import { COMPOSABLE_CARD_THEME_OPTIONS } from "./composablecard.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";
import { ConditionalPropertyCallback, defineField, defineType } from "sanity";

const schema = defineType({
  name: "module.cardgrid",
  title: "Card Grid",
  type: "object",
  description: "Flexible grid or slider with styleable cards.",
  initialValue: {},
  icon: () => <DocumentIcon type="grid" />,
  preview: {
    select: {
      title: "title",
      eyebrow: "eyebrow",
      language: "language",
      image: "items.0.image",
    },
    prepare({
      eyebrow = "",
      title = "Card Grid",
      language,
      image,
    }: {
      eyebrow?: string;
      title?: string;
      language?: string;
      image?: React.ReactElement;
    }) {
      return {
        title,
        subtitle: prefixWithLanguage(language, eyebrow),
        media: image || <DocumentIcon type="grid" />,
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
      name: "cards",
      title: "Cards",
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
    }),
    defineField({
      name: "copyPaste",
      title: "Copy Paste",
      type: "copyPaste",
      group: "tools",
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
      type: "string",
      group: "content",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "portabletext.simple",
      group: "content",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      description: "Manually put together a list of cards.",
      hidden: (({ parent, value }) =>
        !value && parent?.feed) as ConditionalPropertyCallback,
      group: ["content", "cards"],
      of: [{ type: "card.composable" }, { type: "card.image" }],
    }),
    defineField({
      name: "feed",
      title: "Feed",
      type: "object",
      group: ["content", "cards"],
      description: "Automatically let a list of predefined cards flow in.",
      hidden: (({ parent, value }) =>
        !value && parent?.items) as ConditionalPropertyCallback,
      fields: [
        defineField({
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: optionsToList(COMPOSABLE_CARD_THEME_OPTIONS),
          },
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          hidden: (({ parent, value }) =>
            !value && parent?.type !== "person") as ConditionalPropertyCallback,
          of: [{ type: "reference", to: [{ type: "person" }] }],
        }),
      ],
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
                  list: optionsToList(ALIGN_OPTIONS),
                },
              },
            ],
          },
        }),
        defineField({
          name: "grid",
          title: "Grid",
          type: "styles",
          options: {
            fields: [
              {
                name: "columns",
                type: "select",
                options: {
                  list: optionsToList(COLUMN_OPTIONS),
                },
              },
              {
                name: "gapHorizontal",
                type: "select",
                options: {
                  list: optionsToList(GAP_OPTIONS),
                },
              },
              {
                name: "gapVertical",
                type: "select",
                options: {
                  list: optionsToList(GAP_OPTIONS),
                },
              },
              {
                name: "stagger",
                title: "Stagger",
                type: "boolean",
              },
            ],
          },
        }),
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "styles",
          options: {
            fields: [
              {
                name: "color",
                type: "color",
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
                name: "color",
                type: "color",
              },
              {
                name: "level",
                type: "select",
                options: {
                  list: optionsToList(HEADING_LEVELS),
                },
              },
            ],
          },
        }),
        defineField({
          name: "text",
          title: "Text",
          type: "styles",
          options: {
            fields: [
              {
                name: "color",
                type: "color",
              },
            ],
          },
        }),
        defineField({
          name: "buttons",
          title: "Buttons",
          type: "styles",
          options: {
            fields: [
              {
                name: "position",
                type: "select",
                options: {
                  list: optionsToList(BUTTON_POSITION_OPTIONS),
                },
              },
            ],
          },
        }),
        defineField({
          name: "slider",
          title: "Slider",
          type: "styles",
          options: {
            fields: [
              {
                name: "mobile",
                type: "boolean",
              },
              {
                name: "desktop",
                type: "boolean",
              },
              {
                name: "color",
                type: "color",
                options: {
                  colors: SLIDER_COLOR_OPTIONS,
                },
              },
            ],
          },
        }),
        defineField({
          name: "decorations",
          title: "Decorations",
          type: "styles",
          options: {
            fields: [
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
        }),
      ],
    }),
  ],
});

export default schema;
