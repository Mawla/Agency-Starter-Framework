import { SchemaName } from "../../../types.sanity";
import {
  AUTHOR_FIELD,
  DEFAULT_ARTICLE_PAGE_PREVIEW,
  getParentDocumentInitialValue,
  IMAGE_FIELD,
  DEFAULT_ARTICLE_PAGE_ORDERINGS,
  pageBase,
  PARENT_FIELD,
  PUBLISHED_AT_FIELD,
  TAGS_FIELD,
} from "./page-fields";
import { InkPen } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.blog";

export default defineType({
  name: SCHEMA_NAME,
  title: "Blog",
  type: "document",
  orderings: DEFAULT_ARTICLE_PAGE_ORDERINGS,
  preview: DEFAULT_ARTICLE_PAGE_PREVIEW,
  icon: () => <InkPen weight="thin" size={20} />,
  initialValue: async (props: any, context: any) => {
    return await getParentDocumentInitialValue(context, "page_blogs");
  },
  groups: [...pageBase.groups],
  fields: [
    {
      ...PARENT_FIELD,
      to: [{ type: "page.blogs" }],
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
