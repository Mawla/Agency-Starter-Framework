import { SchemaName } from "../../../types.sanity";
import { getStructurePath } from "../../utils/desk/get-structure-path";
import {
  DEFAULT_CONTENT_PAGE_PREVIEW,
  ORDER_PUBLISHED_DESC,
  pageBase,
  PARENT_FIELD,
  PUBLISHED_AT_FIELD,
  TAGS_FIELD,
} from "./page-fields";
import { VideoPlayerWebsite } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.video";

export default defineType({
  name: SCHEMA_NAME,
  title: "Video",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  icon: () => <VideoPlayerWebsite weight="thin" size={20} />,
  initialValue: () => {
    const { language } = getStructurePath();
    return {
      parent: { _type: "reference", _ref: `page_videos__i18n_${language}` },
    };
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [
    {
      ...PARENT_FIELD,
      to: [{ type: "page.videos" }],
      options: { disableNew: true },
      hidden: true,
    },
    ...pageBase.fields,
    TAGS_FIELD,
    PUBLISHED_AT_FIELD,
  ],
});
