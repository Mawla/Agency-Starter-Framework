import { SchemaName } from "../../../types.sanity";
import {
  PARENT_FIELD,
  ORDER_PUBLISHED_DESC,
  pageBase,
  PUBLISHED_AT_FIELD,
  DEFAULT_CONTENT_PAGE_PREVIEW,
} from "./page-fields";
import { Tag } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.tag";

export default defineType({
  name: SCHEMA_NAME,
  title: "Tag",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  icon: () => <Tag weight="thin" size={20} />,
  initialValue: {},
  fieldsets: [...pageBase.fieldsets],
  fields: [PARENT_FIELD, ...pageBase.fields, PUBLISHED_AT_FIELD],
});
