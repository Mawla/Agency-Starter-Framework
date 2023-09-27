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
import { Book } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.casestudy";

export default defineType({
  name: SCHEMA_NAME,
  title: "Case Study",
  type: "document",
  orderings: DEFAULT_ARTICLE_PAGE_ORDERINGS,
  preview: DEFAULT_ARTICLE_PAGE_PREVIEW,
  icon: () => <Book weight="thin" size={20} />,
  initialValue: async (props: any, context: any) => {
    return await getParentDocumentInitialValue(context, "page_casestudies");
  },
  groups: [...pageBase.groups],
  fields: [
    {
      ...PARENT_FIELD,
      to: [{ type: "page.casestudies" }],
      options: {
        disableNew: true,
        ...PARENT_FIELD.options,
      },
    },
    ...pageBase.fields,
    TAGS_FIELD,
    IMAGE_FIELD,
    PUBLISHED_AT_FIELD,
  ],
});
