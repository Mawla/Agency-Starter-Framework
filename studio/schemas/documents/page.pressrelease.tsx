import { SchemaName } from "../../../types.sanity";
import {
  AUTHOR_FIELD,
  DEFAULT_CONTENT_PAGE_PREVIEW,
  getParentDocumentInitialValue,
  IMAGE_FIELD,
  ORDER_PUBLISHED_DESC,
  pageBase,
  PARENT_FIELD,
  PUBLISHED_AT_FIELD,
  TAGS_FIELD,
} from "./page-fields";
import { Megaphone } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.pressrelease";

export default defineType({
  name: SCHEMA_NAME,
  title: "Press Release",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  icon: () => <Megaphone weight="thin" size={20} />,
  initialValue: async (props: any, context: any) => {
    return await getParentDocumentInitialValue(context, "page_pressreleases");
  },
  groups: [...pageBase.groups],
  fields: [
    {
      ...PARENT_FIELD,
      to: [{ type: "page.pressreleases" }],
      options: {
        disableNew: true,
        ...PARENT_FIELD.options,
      },
    },
    ...pageBase.fields,
    TAGS_FIELD,
    IMAGE_FIELD,
    AUTHOR_FIELD,
    PUBLISHED_AT_FIELD,
  ],
});
