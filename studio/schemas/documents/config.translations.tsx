import { TRANSLATION_FIELDS } from "../../../types";
import { SchemaName } from "../../../types.sanity";
import Warning from "../../components/Warning";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";

export const SCHEMA_NAME: SchemaName = "config.translations";

export default {
  name: SCHEMA_NAME,
  title: "Translations",
  type: "document",
  singleton: true,
  localize: true,
  icon: () => <DocumentIcon type="translations" />,
  preview: {
    prepare() {
      return {
        title: `Translations configuration`,
      };
    },
  },
  fields: [
    {
      name: "warning",
      title: "Warning",
      type: "string",
      localize: false,
      components: { field: Warning },
      message:
        "Updates to configuration will trigger a new deployment on the build server and will take a few minutes to be in effect.",
    },

    ...Object.entries(TRANSLATION_FIELDS)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, { description }]) => ({
        name: key,
        title: key,
        type: "string",
        description,
        validation: (Rule: any) => Rule.required(),
      })),
  ],
};
