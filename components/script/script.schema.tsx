import { SchemaName } from "../../types.sanity";
import { Coding, CodingWebsite } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType, StringRule } from "sanity";

export const SCHEMA_NAME: SchemaName = "script";

export default defineType({
  name: SCHEMA_NAME,
  title: "Script",
  type: "document",
  icon: () => <Coding weight="thin" />,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Name of the script used to identify it in the cms.",
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: "script",
      title: "Script",
      type: "text",
      rows: 5,
    }),
  ],
});

export const SCRIPT_REFERENCE_FIELD = {
  type: "reference",
  name: "script",
  title: "Script",
  icon: () => <CodingWebsite weight="thin" />,
  preview: {
    select: {
      title: "title",
    },
  },
  to: [{ type: "script" }],
};
