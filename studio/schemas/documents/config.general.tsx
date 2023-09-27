import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../../types.sanity";
import Warning from "../../components/Warning";
import { Gear, Geography } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType, StringRule } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.general";

export default defineType({
  name: SCHEMA_NAME,
  title: "General",
  type: "document",
  icon: () => <Gear weight="thin" size={20} />,
  options: {
    singleton: true,
  },
  preview: {
    prepare() {
      return {
        title: `General configuration`,
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
      name: "name",
      title: "Name",
      type: "string",
      options: { localize: true } as any,
      description:
        "Name of the website. Used in the brand schema as brand name and as fallback page title.",
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: "domain",
      type: "string",
      title: "Domain",
      validation: (Rule: StringRule) =>
        Rule.required().custom(async (value, context) => {
          if (typeof value === "undefined") return true;

          if (value.indexOf("://") > -1) {
            return "The website domain should not contain the protocol.";
          }

          if (value.endsWith("/")) {
            return "The website domain should not contain a trailing slash.";
          }

          return true;
        }),
      description:
        "The website domain without slash and protocol, e.g google.com. Used for the canonical url.",
    }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "array",
      description:
        "Languages used on the website. The first language is the default language.",
      validation: (Rule) => Rule.unique(),
      of: [
        {
          name: "language",
          title: "Language",
          type: "object",
          preview: {
            select: {
              title: "title",
              id: "id",
            },
            prepare({ title, id }) {
              return {
                title,
                subtitle: id === baseLanguage ? "/" : `/${id}`,
                media: () => <Geography weight="thin" size={20} />,
              };
            },
          },
          fields: [
            defineField({
              name: "id",
              title: "ID",
              type: "string",
              description:
                'Language identifier for the language, e.g. "en" for English. Must be a valid ISO 639-1 code. See https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes',
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: 'Name for the language, e.g. "Español" for Spanish.',
              validation: (Rule: StringRule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
});
