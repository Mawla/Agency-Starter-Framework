import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../../types.sanity";
import {
  ORDER_PUBLISHED_DESC,
  pageBase,
  PARENT_FIELD,
  PUBLISHED_AT_FIELD,
} from "./_page";
import { Calendar } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.event";

export default defineType({
  name: SCHEMA_NAME,
  title: "Event",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: "hero.0.image",
    },
  },
  icon: () => <Calendar weight="thin" size={20} />,
  initialValue: {
    parent: { _type: "reference", _ref: "page_events" },
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [
    {
      ...PARENT_FIELD,
      to: [{ type: "page.events" }],
      options: { disableNew: true },
      hidden: true,
    },
    ...pageBase.fields,
    PUBLISHED_AT_FIELD,
  ],
});
