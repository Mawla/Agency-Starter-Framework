import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../../types.sanity";
import {
  ORDER_PUBLISHED_DESC,
  pageBase,
  PARENT_FIELD,
  PUBLISHED_AT_FIELD,
} from "./_page";
import { Book } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.casestudy";

export default defineType({
  name: SCHEMA_NAME,
  title: "CaseStudy",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: "hero.0.image",
    },
  },
  icon: () => <Book weight="thin" size={20} />,
  initialValue: {
    ...pageBase.initialValue,
    parent: { _type: "reference", _ref: "page_casestudies" },
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [
    {
      ...PARENT_FIELD,
      to: [{ type: "page.casestudies" }],
      options: { disableNew: true },
      hidden: true,
    },
    ...pageBase.fields,
    PUBLISHED_AT_FIELD,
  ],
});
