import { SchemaName } from "../../../types.sanity";
import { ColorInput } from "../../components/ColorInput";
import ThemeColors from "../../components/Theme/ThemeColors";
import ThemeFontFamily from "../../components/Theme/ThemeFontFamily";
import ThemeFontSize from "../../components/Theme/ThemeFontSize";
import ThemeFontWeight from "../../components/Theme/ThemeFontWeight";
import Warning from "../../components/Warning";
import {
  FileArrowUp,
  PaintBrushTool,
  TextSize,
  Text,
  SizeText,
} from "@vectopus/atlas-icons-react";
import React from "react";
import {
  defineArrayMember,
  defineField,
  defineType,
  NumberRule,
  StringRule,
} from "sanity";

export const SCHEMA_NAME: SchemaName = "config.theme";

export default defineType({
  name: SCHEMA_NAME,
  title: "Theme",
  type: "document",
  icon: () => <PaintBrushTool weight="thin" size={20} />,
  options: {
    singleton: true,
  },
  preview: {
    prepare() {
      return {
        title: `Theme configuration`,
      };
    },
  },
  fields: [
    defineField({
      name: "warning",
      title: "Warning",
      type: "string",
      options: { localize: false } as any,
      components: { field: Warning },
      description:
        "Updates to configuration will trigger a new deployment on the build server and will take a few minutes to be in effect.",
    }),
    defineField({
      name: "fontFamily",
      title: "Font families",
      type: "array",
      description:
        "Fonts used in the theme. Be sure to include at least 'text' and 'heading'",
      components: {
        input: ThemeFontFamily,
      },
      of: [
        {
          type: "object",
          title: "Font",
          preview: {
            select: {
              name: "name",
              value: "value",
            },
            prepare({ name, value }) {
              return {
                title: name,
                subtitle: value,
                media: <Text weight="thin" />,
              };
            },
          },
          fields: [
            defineField({
              name: "name",
              title: "Family name",
              type: "string",
              description: "Name of the font group, e.g 'sans' or 'display'",
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "value",
              type: "string",
              description: "Comma separated list of font names",
              validation: (Rule: StringRule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "fontWeight",
      title: "Font weights",
      type: "array",
      description: "Fonts weights used in the theme.",
      components: {
        input: ThemeFontWeight,
      },
      of: [
        {
          type: "object",
          title: "Font",
          preview: {
            select: {
              name: "name",
              value: "value",
            },
            prepare({ name, value }) {
              return {
                title: name,
                subtitle: value,
                media: <TextSize weight="thin" />,
              };
            },
          },
          fields: [
            defineField({
              name: "name",
              title: "Weight name",
              type: "string",
              description:
                "Name of the font weight, e.g 'thin' or 'extra-bold'",
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "value",
              type: "number",
              description: "Numeric weight value, e.g 100 or 800",
              validation: (Rule: NumberRule) => Rule.required(),
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "fontSize",
      title: "Font sizes",
      type: "array",
      description:
        "Fonts sizes used in the theme. Be sure to order these from smallest to largest.",
      components: {
        input: ThemeFontSize,
      },
      of: [
        {
          type: "object",
          title: "Font size",
          preview: {
            select: {
              name: "name",
              size: "size",
              lineHeight: "lineHeight",
              letterSpacing: "letterSpacing",
              fontWeight: "fontWeight",
            },
            prepare({
              name,
              size,
              lineHeight = "",
              letterSpacing = "",
              fontWeight = "",
            }) {
              return {
                title: name,
                subtitle: `${size} ${[lineHeight, letterSpacing, fontWeight]
                  .filter(Boolean)
                  .join(", ")}`,
                media: <SizeText weight="thin" />,
              };
            },
          },
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              description: "Name of the font size, e.g 'sm' or '2xl'",
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              description: "Size, e.g '1rem' or '20px'",
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: "lineHeight",
              title: "Line height",
              type: "string",
              description: "Leading, e.g '1rem' or '20px'",
            }),
            defineField({
              name: "letterSpacing",
              title: "Letter spacing",
              type: "string",
              description: "Space between letters, e.g '-0.01em'",
            }),
            defineField({
              name: "fontWeight",
              title: "Font weight",
              type: "string",
              description: "Font weight, e.g '400' or 'bold'",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "colors",
      title: "Colors",
      type: "array",
      description: "Colors used in the theme",
      components: {
        input: ThemeColors,
      },
      of: [
        defineArrayMember({
          name: "color",
          type: "object",
          preview: {
            select: {
              name: "name",
              value: "value",
            },
            prepare({ name, value }) {
              return {
                title: name,
                subtitle: value,
                media: () => (
                  <span
                    style={{
                      width: "100%",
                      height: "100%",
                      background: value,
                    }}
                  ></span>
                ),
              };
            },
          },
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              description: "Name of the color",
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: "Hexadecimal value of the color, e.g #ff0000",
              components: {
                input: ColorInput,
              },
              validation: (Rule) =>
                Rule.custom((value) => {
                  if (typeof value === "undefined") return true;
                  if (!value.startsWith("#")) {
                    return "value must start with #";
                  }
                  if (value.length !== 7) {
                    return "value must be 7 characters long";
                  }
                  return true;
                }).required(),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "stylesheets",
      title: "Stylesheets",
      type: "array",
      description:
        "Custom stylesheets to be used in the theme. This is where you load a custom font.",
      of: [
        defineArrayMember({
          name: "stylesheet",
          type: "object",
          preview: {
            select: {
              name: "name",
              value: "value",
            },
            prepare({ name, value }) {
              return {
                title: name,
                subtitle: value,
                media: <FileArrowUp weight="thin" />,
              };
            },
          },
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              description: "Name of the stylesheet",
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Stylesheet",
              type: "text",
              rows: 20,
            }),
          ],
        }),
      ],
    }),
  ],
});
