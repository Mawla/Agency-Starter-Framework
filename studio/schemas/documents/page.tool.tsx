import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../../types.sanity";
import {
  ORDER_PUBLISHED_DESC,
  pageBase,
  PARENT_FIELD,
  PUBLISHED_AT_FIELD,
  TAGS_FIELD,
} from "./_page";
import { Toolbox } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.tool";

export default defineType({
  name: SCHEMA_NAME,
  title: "Tool",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: "hero.0.image",
    },
  },
  icon: () => <Toolbox weight="thin" size={20} />,
  initialValue: {
    parent: { _type: "reference", _ref: "page_tools" },
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [
    {
      ...PARENT_FIELD,
      to: [{ type: "page.tools" }],
      options: { disableNew: true },
      hidden: true,
    },
    ...pageBase.fields,
    TAGS_FIELD,
    PUBLISHED_AT_FIELD,
  ],
});
