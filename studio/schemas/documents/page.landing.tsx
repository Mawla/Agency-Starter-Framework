import { SchemaName } from "../../../types.sanity";
import {
  PARENT_FIELD,
  pageBase,
  DEFAULT_CONTENT_PAGE_PREVIEW,
  DEFAULT_CONTENT_PAGE_ORDERINGS,
} from "./page-fields";
import { ClickBait } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.landing";

export default defineType({
  name: SCHEMA_NAME,
  title: "Landing",
  type: "document",
  orderings: DEFAULT_CONTENT_PAGE_ORDERINGS,
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  icon: () => <ClickBait weight="thin" size={20} />,
  initialValue: {},
  groups: [...pageBase.groups],
  fields: [PARENT_FIELD, ...pageBase.fields],
});
