import { DocumentIcon } from "../../studio/utils/DocumentIcon";
import { prefixWithLanguage } from "../../studio/utils/language/prefix-with-language";
import React from "react";
import { defineField, defineType, SlugRule } from "sanity";

const schema = defineType({
  name: "MyDialogSchema",
  title: "MyDialogTitle",
  type: "object",
  icon: () => <DocumentIcon type="dialog" />,
  preview: {
    select: {
      language: "language",
    },
    prepare({ language }: any) {
      return {
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
      name: "title",
      title: "Title",
      type: "string",
    }),
  ],
});

export default schema;
