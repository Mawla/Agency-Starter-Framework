import { MODULE_RADIUS_OPTIONS } from "../../..//components/module/BackgroundOptions";
import { SLIDER_COLOR_OPTIONS } from "../../../components/Slider/SliderOptions";
import { SPACE_OPTIONS } from "../../../components/module/SpacingOptions";
import { CardGridProps } from "../../../modules/CardGrid/CardGrid";
import {
  ALIGN_OPTIONS,
  BACKGROUND_COLOR_OPTIONS,
  BUTTON_POSITION_OPTIONS,
  COLUMN_OPTIONS,
  GAP_OPTIONS,
  TITLE_SIZE_OPTIONS,
} from "../../../modules/CardGrid/CardGridOptions";
import { COMPOSABLE_CARD_THEME_OPTIONS } from "../../../modules/CardGrid/ComposableCardOptions";
import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { optionsToList } from "../../utils/fields/optionsToList";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "object";
  initialValue: {
    theme?: CardGridProps["theme"];
  };
  fields: ({
    name: keyof CardGridProps | "language" | "preset" | "copyPaste" | "feed";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
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
      name: "intro",
      title: "Intro",
      type: "richtext.simple",
      group: "content",
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      description: "Manually put together a list of cards.",
      hidden: ({ parent, value }) => !value && parent?.feed,
      group: ["content", "cards"],
      of: [{ type: "card.composable" }, { type: "card.image" }],
    },
    {
      name: "feed",
      title: "Feed",
      type: "object",
      group: ["content", "cards"],
      description: "Automatically let a list of predefined cards flow in.",
      hidden: ({ parent, value }) => !value && parent?.items,
      fields: [
        {
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: optionsToList(COMPOSABLE_CARD_THEME_OPTIONS),
          },
        },
        {
          name: "items",
          title: "Items",
          type: "array",
          hidden: ({ parent, value }) => !value && parent?.type !== "person",
          of: [{ type: "reference", to: [{ type: "person" }] }],
        },
      ],
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
        },
        {
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
        },
        {
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
                title: "Show Lozenges",
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
