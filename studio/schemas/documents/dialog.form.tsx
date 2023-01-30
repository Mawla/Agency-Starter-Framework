import { DocumentIcon } from "../../utils/DocumentIcon";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import React from "react";
import { defineField, defineType, SlugRule } from "sanity";

const schema = defineType({
  name: "dialog.form",
  title: "Form",
  type: "object",
  icon: () => <DocumentIcon type="dialog" />,
  preview: {
    select: {
      title: "form.name",
      language: "language",
    },
    prepare({ title = "", language }: any) {
      return {
        title: `Form: ${title}`,
        subtitle: prefixWithLanguage(language),
      };
    },
  },
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "language",
    }),
    defineField({
      name: "slug",
      title: "Identifier",
      type: "slug",
      validation: (Rule: SlugRule) => Rule.required(),
      description:
        "Unique identifier used to link to this dialog from a button. Only lowercase and no special characters except -",
    }),
    defineField({
      name: "form",
      title: "Form",
      type: "reference",
      to: [{ type: "form.static" }],
    }),
  ],
});

export default schema;
