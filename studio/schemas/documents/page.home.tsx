import { SchemaName } from "../../../types.sanity";
import { DEFAULT_CONTENT_PAGE_PREVIEW, pageBase } from "./page-fields";
import { House } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.home";

export default defineType({
  name: SCHEMA_NAME,
  title: "Homepage",
  type: "document",
  icon: () => <House weight="thin" size={20} />,
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  fieldsets: [...pageBase.fieldsets],
  fields: [...pageBase.fields.filter(({ name }) => name !== "slug")],
});
