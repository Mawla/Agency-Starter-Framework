import { SchemaName } from "../../../types.sanity";
import Warning from "../../components/Warning";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";
import { defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.integrations";

export default defineType({
  name: SCHEMA_NAME,
  title: "Integrations",
  type: "document",
  icon: () => <DocumentIcon type="integrations" />,
  initialValue: {},
  preview: {
    prepare() {
      return {
        title: `Integrations configuration`,
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
      name: "gtmid",
      title: "Google Tag Manager ID",
      type: "string",
      description: "Formatted as `GTM-XXXXXX`.",
    }),
  ],
});
