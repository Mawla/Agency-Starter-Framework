import { SchemaName } from "../../../types.sanity";
import {
  DEFAULT_CONTENT_PAGE_PREVIEW,
  getI18nBaseFieldForSingleton,
  ORDER_PUBLISHED_DESC,
  pageBase,
  PARENT_FIELD,
} from "./page-fields";
import { Pages } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.tags";

export default defineType({
  name: SCHEMA_NAME,
  title: "Tags",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  options: {
    singleton: true,
  },
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  icon: () => <Pages weight="thin" size={20} />,
  groups: [...pageBase.groups],
  fields: [
    PARENT_FIELD,
    ...pageBase.fields.map((field) => {
      if (field.name === "i18n_base") {
        return getI18nBaseFieldForSingleton(SCHEMA_NAME);
      }
      return { ...field };
    }),
  ],
});
