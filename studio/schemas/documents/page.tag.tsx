import { SchemaName } from "../../../types.sanity";
import {
  PARENT_FIELD,
  DEFAULT_CONTENT_PAGE_ORDERINGS,
  pageBase,
  PUBLISHED_AT_FIELD,
  DEFAULT_CONTENT_PAGE_PREVIEW,
  getParentDocumentInitialValue,
} from "./page-fields";
import { Tag } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.tag";

export default defineType({
  name: SCHEMA_NAME,
  title: "Tag",
  type: "document",
  orderings: DEFAULT_CONTENT_PAGE_ORDERINGS,
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  icon: () => <Tag weight="thin" size={20} />,
  initialValue: async (props: any, context: any) => {
    return await getParentDocumentInitialValue(context, "page_tags");
  },
  groups: [...pageBase.groups],
  fields: [
    {
      ...PARENT_FIELD,
      to: [{ type: "page.tags" }],
      options: {
        disableNew: true,
        ...PARENT_FIELD.options,
      },
    },
    ...pageBase.fields,
    PUBLISHED_AT_FIELD,
  ],
});
