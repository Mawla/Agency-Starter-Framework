import { SchemaName } from "../../../types.sanity";
import {
  DEFAULT_CONTENT_PAGE_ORDERINGS,
  DEFAULT_CONTENT_PAGE_PREVIEW,
  pageBase,
  PARENT_FIELD,
} from "./page-fields";
import { BlogWebsite } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.content";

export default defineType({
  name: SCHEMA_NAME,
  title: "Content page",
  type: "document",
  icon: () => <BlogWebsite weight="thin" size={20} />,
  orderings: DEFAULT_CONTENT_PAGE_ORDERINGS,
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  groups: [...pageBase.groups],
  fields: [PARENT_FIELD, ...pageBase.fields],
});
