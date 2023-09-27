import { SchemaName } from "../../../types.sanity";
import Warning from "../../components/Warning";
import { Share } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.social";

export default defineType({
  name: SCHEMA_NAME,
  title: "Social media",
  type: "document",
  icon: () => <Share weight="thin" size={20} />,
  options: {
    singleton: true,
  },
  preview: {
    prepare() {
      return {
        title: `Social configuration`,
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
      name: "twitter",
      title: "Twitter",
      type: "object",
      fields: [
        defineField({
          name: "handle",
          title: "Handle",
          type: "string",
        }),
        defineField({
          name: "url",
          title: "URL",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
