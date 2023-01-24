import { SchemaName } from "../../../types.sanity";
import Warning from "../../components/Warning";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";
import { defineField, defineType, StringRule } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.general";

export default defineType({
  name: SCHEMA_NAME,
  title: "General",
  type: "document",
  singleton: true,
  icon: () => <DocumentIcon type="config" />,
  initialValue: {},
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
        "Name of the website. Used in the page title and brand schema as brand name.",
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: "domain",
      type: "string",
      options: { localize: true } as any,
      title: "Domain",
      validation: (Rule: StringRule) => Rule.required(),
      description:
        "The website domain without slash and protocol, e.g google.com. Used for the canonical url.",
    }),
  ],
});
