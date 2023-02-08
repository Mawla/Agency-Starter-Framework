import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../../types.sanity";
import {
  ORDER_PUBLISHED_DESC,
  pageBase,
  PARENT_FIELD,
  PUBLISHED_AT_FIELD,
} from "./_page";
import { InkPen } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.blog";

export default defineType({
  name: SCHEMA_NAME,
  title: "Blog",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: "hero.0.image",
    },
  },
  icon: () => <InkPen weight="thin" size={20} />,
  initialValue: {
    parent: { _type: "reference", _ref: "page_blogs" },
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [
    {
      ...PARENT_FIELD,
      to: [{ type: "page.blogs" }],
      options: { disableNew: true },
      hidden: true,
    },
    ...pageBase.fields,
    PUBLISHED_AT_FIELD,
  ],
});
