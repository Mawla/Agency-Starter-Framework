import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { SchemaName } from "../../types.sanity";
import { NEXT_LOADING_STRATEGIES } from "./script.options";
import { Coding, CodingWebsite } from "@vectopus/atlas-icons-react";
import React from "react";
import {
  ConditionalPropertyCallback,
  defineArrayMember,
  defineField,
  defineType,
  StringRule,
} from "sanity";

export const SCHEMA_NAME: SchemaName = "script";

export default defineType({
  name: SCHEMA_NAME,
  title: "Script",
  type: "document",
  icon: () => <Coding weight="thin" />,
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
        media: <CodingWebsite weight="thin" />,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Name of the script used to identify it in the CMS.",
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Scripts",
      type: "array",
      of: [
        defineField({
          name: "item",
          title: "Script",
          type: "object",
          preview: {
            select: {
              title: "title",
              code: "code",
              html: "html",
              src: "src",
            },
            prepare: ({ title, code, html, src }) => {
              return {
                title: title || code || html || src,
                subtitle: code || html || src,
                media: <Coding weight="thin" />,
              };
            },
          },
          groups: [
            {
              name: "script",
              title: "Script",
              default: true,
            },
            {
              name: "advanced",
              title: "Advanced",
            },
          ],
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: "Name of the script",
              group: "script",
            }),
            defineField({
              name: "code",
              title: "Javascript code",
              description:
                "The script to be added inside script tags, e.g `console.log('hello world')`. Any <script /> tags will not be executed.",
              type: "text",
              rows: 10,
              hidden: (({ parent, value }) =>
                Boolean(!value && parent?.src)) as ConditionalPropertyCallback,
              group: "script",
            }),
            defineField({
              name: "html",
              title: "HTML code",
              description:
                "Any HTML code to be added to the page, like a <div />. Any <script /> tags will not be executed.",
              type: "text",
              rows: 10,
              group: "script",
            }),
            defineField({
              name: "src",
              title: "External script source",
              description: "The script src attribute",
              type: "string",
              hidden: (({ parent, value }) =>
                Boolean(!value && parent?.code)) as ConditionalPropertyCallback,
              group: "script",
            }),
            defineField({
              name: "attributes",
              title: "Script attributes",
              description: "Attributes to be placed on the script tag",
              type: "array",
              group: "script",
              of: [
                defineArrayMember({
                  name: "attribute",
                  title: "Attribute",
                  type: "object",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Name",
                      type: "string",
                      validation: (Rule: StringRule) => Rule.required(),
                    }),
                    defineField({
                      name: "value",
                      title: "Value",
                      type: "string",
                      validation: (Rule: StringRule) => Rule.required(),
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: "strategy",
              title: "Loading strategy",
              description: "Fine-tune the script loading behavior.",
              type: "string",
              options: {
                list: optionsToList(NEXT_LOADING_STRATEGIES),
              },
              group: "advanced",
            }),
            defineField({
              name: "onready",
              title: "On ready script",
              description:
                "Code to execute after the script has finished loading and every time the component is mounted.",
              type: "text",
              rows: 10,
              group: "advanced",
            }),
            defineField({
              name: "onload",
              title: "On load script",
              description:
                "Code to execute after the script has finished loading",
              type: "text",
              rows: 10,
              group: "advanced",
            }),
            defineField({
              name: "onerror",
              title: "On error script",
              description: "Code to execute if the script fails to load.",
              type: "text",
              rows: 10,
              group: "advanced",
            }),
          ],
        }),
      ],
    }),
  ],
});

export const SCRIPT_REFERENCE_FIELD = {
  type: "object",
  name: "scriptRef",
  title: "Script",
  icon: () => <CodingWebsite weight="thin" />,
  preview: {
    select: {
      title: "script.title",
    },
    prepare({ title = "" }) {
      return {
        title,
        media: <CodingWebsite weight="thin" />,
      };
    },
  },
  fields: [
    {
      type: "reference",
      name: "script",
      title: "Script",
      icon: () => <CodingWebsite weight="thin" />,
      preview: {
        select: {
          title: "title",
        },
        prepare({ title = "" }) {
          return {
            title,
            media: <CodingWebsite weight="thin" />,
          };
        },
      },
      to: [{ type: "script" }],
    },
  ],
};
