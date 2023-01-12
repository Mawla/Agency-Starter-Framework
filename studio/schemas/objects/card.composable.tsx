import { VARIANT_OPTIONS as BADGE_VARIANT_OPTIONS } from "../../../components/Badge/Badge";
import { SIZE_OPTIONS as TEXT_SIZE_OPTIONS } from "../../../components/module/Text";
import {
  SIZE_OPTIONS as TITLE_SIZE_OPTIONS,
  WEIGHT_OPTIONS as TITLE_WEIGHT_OPTIONS,
} from "../../../components/module/Title";
import {
  BORDER_COLOR_OPTIONS,
  CARD_ALIGN_OPTIONS,
  CARD_BACKGROUND_COLOR_OPTIONS,
  CARD_EFFECT_OPTIONS,
  CARD_SPACING_OPTIONS,
  ICON_COLOR_OPTIONS,
  ICON_SIZE_OPTIONS,
  IMAGE_HEIGHT_OPTIONS,
  IMAGE_RATIO_OPTIONS,
  IMAGE_ROUNDED_OPTIONS,
  TEXT_COLOR_OPTIONS,
  TITLE_COLOR_OPTIONS,
} from "../../../modules/CardGrid/ComposableCardOptions";
import IconPicker from "../../components/IconPicker";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { optionsToList } from "../../utils/fields/optionsToList";
import { blocksToText } from "../../utils/portableText/portableTextToText";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";

export const schema = {
  title: "Composable card",
  name: "card.composable",
  type: "document",
  icon: () => <DocumentIcon type="star" />,
  preview: {
    select: {
      title: "title",
      badge: "badge",
      subtitle: "subtitle",
      text: "text",
      image: "image",
      cover: "cover",
    },
    prepare({ badge = "", title = "", subtitle = "", text, image, cover }) {
      return {
        title: `${badge} ${title} ${subtitle}`,
        subtitle: blocksToText(text),
        media: image || cover,
      };
    },
  },
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
    {
      title: "Theme",
      name: "theme",
    },
  ],
  fields: [
    {
      name: "cover",
      title: "Cover",
      type: "image",
      description: "Full-width 16/9 cover photo.",
      group: "content",
      hidden: ({ parent, value }) => !value && (parent?.image || parent?.icon),
      options: {
        hotspot: true,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      description: "Photo that can be sized, rounded and positioned.",
      group: "content",
      hidden: ({ parent, value }) => !value && (parent?.cover || parent?.icon),
      options: {
        hotspot: true,
      },
    },
    {
      name: "icon",
      title: "Icon",
      type: "string",
      group: "content",
      description: "Symbol from the icon set.",
      hidden: ({ parent, value }) => !value && (parent?.cover || parent?.image),
      components: { input: IconPicker },
    },
    {
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Used to highlight a date, very short text and/or numbers.",
      group: "content",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      group: "content",
    },
    {
      name: "text",
      title: "Text",
      type: "richtext.simple",
      group: "content",
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
          name: "card",
          title: "Card",
          type: "styles",
          options: {
            fields: [
              {
                name: "background",
                type: "color",
                options: {
                  colors: CARD_BACKGROUND_COLOR_OPTIONS,
                },
              },
              {
                name: "border",
                type: "color",
                options: {
                  colors: BORDER_COLOR_OPTIONS,
                },
              },
              {
                name: "align",
                type: "select",
                options: {
                  list: optionsToList(CARD_ALIGN_OPTIONS),
                },
              },
              {
                name: "shadow",
                title: "Shadow",
                type: "boolean",
              },
              {
                name: "effect",
                type: "select",
                options: {
                  list: optionsToList(CARD_EFFECT_OPTIONS),
                },
              },
              {
                name: "spacing",
                type: "select",
                options: {
                  list: optionsToList(CARD_SPACING_OPTIONS),
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
                name: "ratio",
                type: "select",
                options: {
                  list: optionsToList(IMAGE_RATIO_OPTIONS),
                },
              },
              {
                name: "height",
                type: "select",
                options: {
                  list: optionsToList(IMAGE_HEIGHT_OPTIONS),
                },
              },
              {
                name: "rounded",
                type: "select",
                options: {
                  list: optionsToList(IMAGE_ROUNDED_OPTIONS),
                },
              },
            ],
          },
        },
        {
          name: "icon",
          title: "Icon",
          type: "styles",
          options: {
            fields: [
              {
                name: "size",
                type: "select",
                options: {
                  list: optionsToList(ICON_SIZE_OPTIONS),
                },
              },
              {
                name: "color",
                type: "color",
                options: {
                  colors: ICON_COLOR_OPTIONS,
                },
              },
            ],
          },
        },
        {
          name: "badge",
          title: "Badge",
          type: "styles",
          options: {
            fields: [
              {
                name: "variant",
                type: "select",
                options: {
                  list: optionsToList(BADGE_VARIANT_OPTIONS),
                },
              },
              {
                name: "alt",
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
              {
                name: "color",
                type: "color",
                options: {
                  colors: TITLE_COLOR_OPTIONS,
                },
              },
              {
                name: "weight",
                type: "select",
                options: {
                  list: optionsToList(TITLE_WEIGHT_OPTIONS),
                },
              },
            ],
          },
        },
        {
          name: "subtitle",
          title: "Subtitle",
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
                options: {
                  colors: TITLE_COLOR_OPTIONS,
                },
              },
              {
                name: "weight",
                type: "select",
                options: {
                  list: optionsToList(TITLE_WEIGHT_OPTIONS),
                },
              },
            ],
          },
        },
        {
          name: "text",
          title: "Text",
          type: "styles",
          options: {
            fields: [
              {
                name: "size",
                type: "select",
                options: {
                  list: optionsToList(TEXT_SIZE_OPTIONS),
                },
              },
              {
                name: "color",
                type: "color",
                options: {
                  colors: TEXT_COLOR_OPTIONS,
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
                name: "hidden",
                type: "boolean",
              },
            ],
          },
        },
      ],
    },
  ],
};

export default schema;
