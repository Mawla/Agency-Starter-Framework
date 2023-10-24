import { SchemaName } from "../../../types.sanity";
import { getLinkableTypes } from "../../utils/schemas/getLinkableTypes";
import { Passcode } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType, StringRule } from "sanity";

export const SCHEMA_NAME: SchemaName = "password";

export default defineType({
  name: SCHEMA_NAME,
  type: "document",
  title: "Password",
  icon: () => <Passcode weight="thin" />,
  fields: [
    defineField({
      name: "password",
      title: "Password",
      type: "string",
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: "page",
      title: "Page",
      type: "reference",
      to: getLinkableTypes(),
      validation: (Rule) => Rule.required(),
      weak: true,
    }),
  ],
});
