import { SchemaName } from "../../../types.sanity";
import {
  getI18nBaseFieldForSingleton,
  getPreviewSlugPagePath,
  LANGUAGE_FIELD,
  pageBase,
  SLUG_FIELD,
  TITLE_FIELD,
} from "./page-fields";
import { ListRight } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.sitemap";

export default defineType({
  name: SCHEMA_NAME,
  title: "Sitemap page",
  type: "document",
  options: {
    singleton: true,
  },
  icon: () => <ListRight weight="thin" size={20} />,
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
      ...SLUG_FIELD,
      initialValue: { current: "sitemap" },
      description:
        "This must match the slug of the Next.js pages/sitemap.tsx file.",
      readOnly: true,
      hidden: true,
    },
    { ...LANGUAGE_FIELD, readOnly: true },
    getI18nBaseFieldForSingleton(SCHEMA_NAME),
  ],
});
