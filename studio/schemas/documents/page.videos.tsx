import { SchemaName } from "../../../types.sanity";
import {
  DEFAULT_CONTENT_PAGE_PREVIEW,
  ORDER_PUBLISHED_DESC,
  pageBase,
  PARENT_FIELD,
} from "./page-fields";
import { VideoPlayerWebsite } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.videos";

export default defineType({
  name: SCHEMA_NAME,
  title: "Videos overview",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  options: {
    singleton: true,
  },
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  icon: () => <VideoPlayerWebsite weight="thin" size={20} />,
  groups: [...pageBase.groups],
  fields: [PARENT_FIELD, ...pageBase.fields],
});
