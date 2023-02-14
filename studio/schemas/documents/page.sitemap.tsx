import { SchemaName } from "../../../types.sanity";
import {
  HERO_FIELD,
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
    },
  },
  groups: [...pageBase.groups],
  fields: [
    TITLE_FIELD,
    {
      ...SLUG_FIELD,
      description:
        "This must match the slug of the Next.js pages/sitemap.tsx file.",
      initialValue: () => ({ current: "sitemap" }),
      readOnly: true,
    },
    LANGUAGE_FIELD,
    HERO_FIELD,
  ],
});
