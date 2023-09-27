import { SchemaName } from "../../../types.sanity";
import {
  DEFAULT_ARTICLE_PAGE_PREVIEW,
  getParentDocumentInitialValue,
  IMAGE_FIELD,
  DEFAULT_ARTICLE_PAGE_ORDERINGS,
  pageBase,
  PARENT_FIELD,
  PUBLISHED_AT_FIELD,
  TAGS_FIELD,
} from "./page-fields";
import { Calendar } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.event";

export default defineType({
  name: SCHEMA_NAME,
  title: "Event",
  type: "document",
  orderings: DEFAULT_ARTICLE_PAGE_ORDERINGS,
  preview: DEFAULT_ARTICLE_PAGE_PREVIEW,
  icon: () => <Calendar weight="thin" size={20} />,
  initialValue: async (props: any, context: any) => {
    return await getParentDocumentInitialValue(context, "page_events");
  },
  groups: [...pageBase.groups],
  fields: [
    {
      ...PARENT_FIELD,
      to: [{ type: "page.events" }],
      options: {
        disableNew: true,
        ...PARENT_FIELD.options,
      },
    },
    ...pageBase.fields,
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      validation: (Rule: any) => Rule.required().warning(),
      group: ["content"],
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      validation: (Rule: any) => Rule.required().warning(),
      group: ["content"],
    }),
    TAGS_FIELD,
    IMAGE_FIELD,
    PUBLISHED_AT_FIELD,
  ],
});
