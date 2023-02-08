import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../../types.sanity";
import {
  PARENT_FIELD,
  ORDER_PUBLISHED_DESC,
  pageBase,
  PUBLISHED_AT_FIELD,
} from "./_page";
import { ClickBait } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.landing";

export default defineType({
  name: SCHEMA_NAME,
  title: "Landing",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: "hero.0.image",
    },
  },
  icon: () => <ClickBait weight="thin" size={20} />,
  initialValue: {},
  fieldsets: [...pageBase.fieldsets],
  fields: [...pageBase.fields, PUBLISHED_AT_FIELD],
});
