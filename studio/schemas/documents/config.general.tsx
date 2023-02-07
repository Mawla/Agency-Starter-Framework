import { SchemaName } from "../../../types.sanity";
import Warning from "../../components/Warning";
import { Gear } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType, StringRule } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.general";

export default defineType({
  name: SCHEMA_NAME,
  title: "General",
  type: "document",
  icon: () => <Gear weight="thin" size={20} />,
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
      validation: (Rule: StringRule) =>
        Rule.required().custom(async (value, context) => {
          if (typeof value === "undefined") return true;
          const regex =
            /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i;
          if (regex.test(value || "")) {
            return true;
          } else {
            return "Invalid value: The website domain without should not contain a trailing slash or the protocol.";
          }
        }),
      description:
        "The website domain without slash and protocol, e.g google.com. Used for the canonical url.",
    }),
  ],
});
