import { SchemaName } from "../../../types.sanity";
import { getStructurePath } from "../../utils/desk/get-structure-path";
import {
  DEFAULT_CONTENT_PAGE_PREVIEW,
  ORDER_PUBLISHED_DESC,
  pageBase,
  PARENT_FIELD,
  PUBLISHED_AT_FIELD,
  TAGS_FIELD,
} from "./page-fields";
import { Textbook } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.guide";

export default defineType({
  name: SCHEMA_NAME,
  title: "Guide",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  icon: () => <Textbook weight="thin" size={20} />,
  initialValue: () => {
    const { language } = getStructurePath();
    return {
      parent: { _type: "reference", _ref: `page_guides__i18n_${language}` },
    };
  },
  groups: [...pageBase.groups],
  fields: [
    {
      ...PARENT_FIELD,
      to: [{ type: "page.guides" }],
      options: { disableNew: true },
      hidden: true,
    },
    ...pageBase.fields,
    TAGS_FIELD,
    PUBLISHED_AT_FIELD,
  ],
});
