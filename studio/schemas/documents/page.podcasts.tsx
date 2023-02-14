import { SchemaName } from "../../../types.sanity";
import {
  DEFAULT_CONTENT_PAGE_PREVIEW,
  ORDER_PUBLISHED_DESC,
  pageBase,
  PARENT_FIELD,
} from "./page-fields";
import { EarMuffs } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.podcasts";

export default defineType({
  name: SCHEMA_NAME,
  title: "Podcasts overview",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  icon: () => <EarMuffs weight="thin" size={20} />,
  initialValue: {
    parent: { _type: "reference", _ref: "page_podcasts" },
  },
  groups: [...pageBase.groups],
  fields: [PARENT_FIELD, ...pageBase.fields],
});
