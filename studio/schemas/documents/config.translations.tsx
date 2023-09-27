import { TRANSLATION_FIELDS } from "../../../types";
import { SchemaName } from "../../../types.sanity";
import Warning from "../../components/Warning";
import { Geography } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.translations";

export default defineType({
  name: SCHEMA_NAME,
  title: "Translations",
  type: "document",
  icon: () => <Geography weight="thin" size={20} />,
  options: {
    singleton: true,
  },
  preview: {
    prepare() {
      return {
        title: `Translations configuration`,
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

    ...Object.entries(TRANSLATION_FIELDS)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, description]) =>
        defineField({
          name: key,
          title: key,
          type: "string",
          description,
          validation: (Rule: any) => Rule.required().warning(),
          options: { localize: true } as any,
        }),
      ),
  ],
});
