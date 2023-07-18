import { SchemaName } from "../../../types.sanity";
import {
  FileArrowUp,
  PaintBrushTool,
  TextSize,
} from "@vectopus/atlas-icons-react";
import React from "react";
import { defineArrayMember, defineField, defineType, StringRule } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.theme";

export default defineType({
  name: SCHEMA_NAME,
  title: "Theme",
  type: "document",
  icon: () => <PaintBrushTool weight="thin" size={20} />,
  initialValue: {},
  preview: {
    prepare() {
      return {
        title: `Theme configuration`,
      };
    },
  },
  fields: [
    defineField({
      name: "fonts",
      title: "Fonts",
      type: "array",
      description:
        "Fonts used in the theme. Be sure to include at least 'sans'",
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
      name: "colors",
      title: "Colors",
      type: "array",
      description: "Colors used in the theme",
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
      description: "Custom stylesheets to be used in the theme",
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
