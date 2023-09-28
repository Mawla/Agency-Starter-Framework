import { SchemaName } from "../../../types.sanity";
import {
  DEFAULT_CONTENT_PAGE_PREVIEW,
  getI18nBaseFieldForSingleton,
  pageBase,
} from "./page-fields";
import { MagnifyingGlass } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.search";

export default defineType({
  name: SCHEMA_NAME,
  title: "Search",
  type: "document",
  options: {
    singleton: true,
  },
  preview: DEFAULT_CONTENT_PAGE_PREVIEW,
  icon: () => <MagnifyingGlass weight="thin" size={20} />,
  groups: [...pageBase.groups],
  fields: [
    ...pageBase.fields.map((field) => {
      if (field.name === "i18n_base") {
        return getI18nBaseFieldForSingleton(SCHEMA_NAME);
      }
      return { ...field };
    }),
  ],
});
