import { SIZE_OPTIONS as TEXT_SIZE_OPTIONS } from "../../components/module/Text";
import {
  SIZE_OPTIONS as TITLE_SIZE_OPTIONS,
  WEIGHT_OPTIONS as TITLE_WEIGHT_OPTIONS,
} from "../../components/module/Title";
import IconPicker from "../../studio/components/IconPicker";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { blocksToText } from "../../studio/utils/portableText/portableTextToText";
import { ICONS } from "../../types";
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
} from "./composablecard.options";
import { IdCard } from "@vectopus/atlas-icons-react";
import React from "react";
import { ConditionalPropertyCallback, defineField, defineType } from "sanity";

export const schema = defineType({
  title: "Composable card",
  name: "card.composable",
  type: "document",
  icon: () => <IdCard weight="thin" />,
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      text: "text",
      image: "image",
      cover: "cover",
    },
    prepare({ title = "", subtitle = "", text, image, cover }: any) {
      return {
        title: `${title} ${subtitle}`,
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
    defineField({
      name: "cover",
      title: "Cover",
      type: "image",
      description: "Full-width 16/9 cover photo.",
      group: "content",
      hidden: (({ parent, value }) =>
        !value &&
        (parent?.image || parent?.icon)) as ConditionalPropertyCallback,
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Photo that can be sized, rounded and positioned.",
      group: "content",
      hidden: (({ parent, value }) =>
        !value &&
        (parent?.cover || parent?.icon)) as ConditionalPropertyCallback,
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      group: "content",
      description: "Symbol from the icon set.",
      hidden: (({ parent, value }) =>
        !value &&
        (parent?.cover || parent?.image)) as ConditionalPropertyCallback,
      components: { input: IconPicker },
      options: {
        icons: ICONS,
      } as any,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "portabletext.simple",
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
        }),
        defineField({
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
        }),
        defineField({
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
        }),
        defineField({
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
        }),
        defineField({
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
        }),
        defineField({
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
        }),
      ],
    }),
  ],
});

export default schema;
