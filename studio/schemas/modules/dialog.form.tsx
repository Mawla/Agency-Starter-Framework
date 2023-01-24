import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import React from "react";
import { SlugRule, StringRule } from "sanity";

type SchemaType = SanitySchemaType & {
  type: "object";
  fields: ({
    name: "form" | "slug" | "language";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "dialog.form",
  title: "Form",
  type: "object",
  icon: () => <DocumentIcon type="dialog" />,
  preview: {
    select: {
      title: "form.name",
      language: "language",
    },
    prepare({ title = "", language }) {
      return {
        title: `Form: ${title}`,
        subtitle: prefixWithLanguage(language),
      };
    },
  },
  fields: [
    {
      name: "language",
      title: "Language",
      type: "language",
    },
    {
      name: "slug",
      title: "Identifier",
      type: "slug",
      validation: (Rule: SlugRule) => Rule.required(),
      description:
        "Unique identifier used to link to this dialog from a button. Only lowercase and no special characters except -",
    },
    {
      name: "form",
      title: "Form",
      type: "reference",
      to: [{ type: "form.static" }],
    },
  ],
};

export default schema;
