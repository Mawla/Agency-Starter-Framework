import { SCRIPT_REFERENCE_FIELD } from "../../../components/script/script.schema";
import { SchemaName } from "../../../types.sanity";
import Warning from "../../components/Warning";
import { TrimPathfinder } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.integrations";

export default defineType({
  name: SCHEMA_NAME,
  title: "Integrations",
  type: "document",
  icon: () => <TrimPathfinder weight="thin" size={20} />,
  options: {
    singleton: true,
  },
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
    defineField({
      name: "googleSiteVerification",
      title: "Google site verification",
      type: "string",
      description: "Google site verification code.",
    }),
    defineField({
      name: "globalScripts",
      title: "Global scripts",
      type: "array",
      description:
        "Scripts to load on every page. Beware this will slow down the website.",
      of: [SCRIPT_REFERENCE_FIELD],
    }),
  ],
});
