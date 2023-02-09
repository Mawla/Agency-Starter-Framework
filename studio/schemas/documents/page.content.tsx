import { SchemaName } from "../../../types.sanity";
import {
  DEFAULT_CONTENT_PAGE_ORDERINGS,
  DEFAULT_CONTENT_PAGE_PREVIEW,
  DIALOGS_FIELD,
  HERO_FIELD,
  MODULES_FIELD,
  pageBase,
  PARENT_FIELD,
  PASSWORD,
  SLUG_FIELD,
  TITLE_FIELD,
} from "./_page";
import { SEO_FIELD } from "./config.seo";
import { BlogWebsite } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.content";

export default defineType({
  name: SCHEMA_NAME,
  title: "Content page",
  type: "document",
  icon: () => <BlogWebsite weight="thin" size={20} />,
  orderings: DEFAULT_CONTENT_PAGE_ORDERINGS,
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  fieldsets: [...pageBase.fieldsets],
  fields: [
    PASSWORD,
    PARENT_FIELD,
    TITLE_FIELD,
    SLUG_FIELD,
    HERO_FIELD,
    MODULES_FIELD,
    DIALOGS_FIELD,
    SEO_FIELD,
    defineField({
      name: "hideNav",
      title: "Hide navigation",
      type: "boolean",
      description: "Option to hide the navigation",
      initialValue: false,
    }),
    defineField({
      name: "hideFooter",
      title: "Hide footer",
      type: "boolean",
      description: "Option to hide the footer",
      initialValue: false,
    }),
  ],
});
