import { LANGUAGE_FIELD } from "./page-fields";
import { CheckListFile, Tables } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "pricing.feature",
  title: "Pricing feature",
  type: "document",
  icon: () => <CheckListFile weight="thin" size={20} />,
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
    {
      title: "Language",
      name: "language",
    },
  ],
  preview: {
    select: {
      title: `name`,
    },
  },
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      description: "Name of the feature, shown above the table of features.",
    }),
    defineField({
      name: "file",
      title: "CSV file",
      type: "file",
      options: { accept: "text/csv" },
      group: "content",
      description:
        "Upload a CSV file with the following columns: name, plan 1 feature, plan 2 feature etc.",
    }),
    {
      ...LANGUAGE_FIELD,
      validation: (Rule) => Rule.required().warning(),
    },
  ],
});

export default schema;
