import { LINKABLE_SCHEMAS, SchemaName } from "../../../types.sanity";
import { ArrowUpCloud } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.deployment";

export default defineType({
  name: SCHEMA_NAME,
  title: "Deployment",
  type: "document",
  icon: () => <ArrowUpCloud weight="thin" size={20} />,
  options: {
    singleton: true,
  },
  preview: {
    prepare() {
      return {
        title: `Website deployment`,
      };
    },
  },
  fields: [
    defineField({
      name: "deployHook",
      title: "Deployment hook",
      type: "string",
      description: "The URL of the deployment hook.",
    }),
    defineField({
      name: "staticGenerationBlacklist",
      title: "Static generation blacklist",
      description:
        "A list of types that should not be statically generated. This can reduce build times.",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: Object.keys(LINKABLE_SCHEMAS).map((schemaName) => ({
              title: schemaName,
              value: schemaName,
            })),
          },
        },
      ],
    }),
  ],
});
