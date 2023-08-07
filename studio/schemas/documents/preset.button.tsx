import { FONTS, FONT_SIZES, FONT_WEIGHTS } from "../../../theme";
import {
  BORDER_RADIUS_OPTIONS,
  BORDER_WIDTH_OPTIONS,
  PADDING_OPTIONS,
} from "../../../types";
import { optionsToList } from "../../utils/fields/optionsToList";
import { StarBookmark } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType, StringRule, SlugRule } from "sanity";

export default defineType({
  name: "preset.button",
  title: "Button preset",
  type: "document",
  icon: () => <StarBookmark weight="thin" size={20} />,
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare({ title = "Button preset", description = "" }) {
      return {
        title: title,
        subtitle: description,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identifier",
      type: "slug",
      validation: (Rule: SlugRule) => Rule.required(),
      options: {
        source: (doc, options) => (options.parent as any).title,
      },
    }),
    defineField({
      name: "default",
      title: "Default",
      type: "boolean",
      description: "Use this preset as the default for all buttons.",
    }),
    defineField({
      name: "mobile",
      title: "Mobile",
      type: "buttonTheme",
      description: 'The base theme, used on "mobile" breakpoints and higher.',
    }),
    defineField({
      name: "tablet",
      title: "Tablet",
      type: "buttonTheme",
      options: { collapsible: true, collapsed: true },
      description:
        'Override the base theme for "tablet" breakpoints and higher.',
    }),
    defineField({
      name: "desktop",
      title: "Desktop",
      type: "buttonTheme",
      options: { collapsible: true, collapsed: true },
      description:
        'Override the base theme for "desktop" breakpoints and higher.',
    }),
  ],
});

export const buttonTheme = defineField({
  name: "buttonTheme",
  title: "Theme",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "styles",
      options: {
        fields: [
          {
            name: "size",
            type: "select",
            options: {
              list: optionsToList(FONT_SIZES),
            },
          },
          {
            name: "weight",
            type: "select",
            options: {
              list: optionsToList(FONT_WEIGHTS),
            },
          },
          {
            name: "font",
            type: "select",
            options: {
              list: optionsToList(FONTS),
            },
          },
          {
            name: "color",
            type: "color",
          },
          {
            name: "uppercase",
            type: "boolean",
          },
        ],
      },
    }),

    defineField({
      name: "background",
      title: "Background",
      type: "styles",
      options: {
        fields: [
          {
            name: "color",
            type: "color",
          },
          {
            name: "paddingX",
            type: "select",
            options: {
              list: optionsToList(PADDING_OPTIONS, true),
            },
          },
          {
            name: "paddingY",
            type: "select",
            options: {
              list: optionsToList(PADDING_OPTIONS, true),
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
  ],
});
