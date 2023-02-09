import { SchemaName } from "../../../types.sanity";
import { WindowShield } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType, StringRule } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.cms";

export default defineType({
  name: SCHEMA_NAME,
  title: "CMS",
  type: "document",
  icon: () => <WindowShield weight="thin" size={20} />,
  initialValue: {},
  preview: {
    prepare() {
      return {
        title: `CMS configuration`,
      };
    },
  },
  fields: [
    defineField({
      name: "previewSecret",
      title: "Preview secret",
      type: "string",
      description:
        "Secret used to authenticate preview requests. This is used to prevent unauthorized access to the preview mode. This must match the secret Vercel environment variable SANITY_PREVIEW_SECRET.",
      validation: (Rule: StringRule) => Rule.required(),
    }),
  ],
});
