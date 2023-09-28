import { SchemaName } from "../../../types.sanity";
import {
  BLOCKS_FIELD,
  getI18nBaseFieldForSingleton,
  getPreviewSlugPagePath,
  LANGUAGE_FIELD,
  pageBase,
  SLUG_FIELD,
  TITLE_FIELD,
} from "./page-fields";
import { MagnifyingGlass } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.search";

export default defineType({
  name: SCHEMA_NAME,
  title: "Search page",
  type: "document",
  options: {
    singleton: true,
  },
  icon: () => <MagnifyingGlass weight="thin" size={20} />,
  preview: {
    select: {
      title: `title`,
      slug: "slug.current",
      language: "language",
    },
    prepare({ title, slug, language }) {
      return {
        title: title,
        subtitle: getPreviewSlugPagePath(language, [slug]),
      };
    },
  },
  groups: [...pageBase.groups],
  fields: [
    TITLE_FIELD,
    {
      ...LANGUAGE_FIELD,
      readOnly: true,
    },
    BLOCKS_FIELD,
  ],
});
