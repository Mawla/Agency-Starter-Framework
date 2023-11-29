import DocumentPreview from "../../components/Preview/DocumentPreview";
import { LANGUAGE_FIELD } from "./page-fields";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { CheckListFile } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "pricing.feature",
  title: "Pricing feature",
  type: "document",
  icon: () => <CheckListFile weight="thin" size={20} />,
  orderings: [orderRankOrdering],
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
      title: `title`,
    },
  },
  fields: [
    defineField({
      name: "preview_sync",
      title: "Preview",
      type: "string",
      components: {
        field: DocumentPreview,
      },
      group: ["content", "language"],
    }),
    orderRankField({ type: "pricing.feature" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "Name of the feature, shown above the table of features.",
    }),
    defineField({
      name: "sample",
      title: "Sample CSV",
      type: "string",
      group: "content",
      components: {
        input: () => {
          return (
            <>
              <pre>Usage;Starter;Growth;Business;Enterprise</pre>
              <pre>Editors and admins;yes;no;Custom;Contact us</pre>
              <pre>Viewers (i=tooltip);10;x;v;Unlimited</pre>
            </>
          );
        },
      },
    }),
    defineField({
      name: "file",
      title: "CSV file",
      type: "file",
      options: { accept: "text/csv" },
      group: "content",
      hidden: ({ parent, value }) => !value && Boolean(parent?.csv),
      description:
        "Upload a CSV file. Values for 'y', 'yes' or 'v' will be replaced with a positive icon and 'n', 'no' or 'x' will be replaced with a negative icon. For tooltips you can use (i=tooltip text).",
    }),
    defineField({
      name: "csv",
      title: "CSV",
      type: "text",
      group: "content",
      hidden: ({ parent, value }) => !value && Boolean(parent?.file),
      rows: 10,
      description:
        "Copy/paste a CSV. Values for 'y', 'yes' or 'v' will be replaced with a positive icon and 'n', 'no' or 'x' will be replaced with a negative icon. For tooltips you can use (i=tooltip text).",
    }),
    {
      ...LANGUAGE_FIELD,
      validation: (Rule) => Rule.required().warning(),
    },
  ],
});

export default schema;
