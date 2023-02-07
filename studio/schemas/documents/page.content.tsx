import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../../types.sanity";
import { isPathUnique } from "../../utils/desk/isPathUnique";
import {
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
import { Pages } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.content";

export default defineType({
  name: SCHEMA_NAME,
  title: "Content page",
  type: "document",
  icon: () => <Pages weight="thin" size={20} />,
  orderings: [
    {
      title: "Title",
      name: "Title",
      by: [{ field: `title.${baseLanguage}`, direction: "asc" }],
    },
    {
      title: "Slug",
      name: "Slug",
      by: [{ field: `slug.${baseLanguage}.current`, direction: "asc" }],
    },
    {
      title: "Path",
      name: "Path",
      by: [
        {
          field: `parent.parent.parent.parent.parent.slug.${baseLanguage}.current`,
          direction: "desc",
        },
        {
          field: `parent.parent.parent.parent.slug.${baseLanguage}.current`,
          direction: "desc",
        },
        {
          field: `parent.parent.parent.slug.${baseLanguage}.current`,
          direction: "desc",
        },
        {
          field: `parent.parent.slug.${baseLanguage}.current`,
          direction: "desc",
        },
        { field: `parent.slug.${baseLanguage}.current`, direction: "desc" },
        { field: `slug.${baseLanguage}.current`, direction: "desc" },
      ],
    },
  ],
  initialValue: {
    ...pageBase.initialValue,
  },
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: "hero.0.visual.image1",
      slug: `slug.${baseLanguage}.current`,
      level1Slug: `parent.slug.${baseLanguage}.current`,
      level2Slug: `parent.parent.slug.${baseLanguage}.current`,
      level3Slug: `parent.parent.parent.slug.${baseLanguage}.current`,
      level4Slug: `parent.parent.parent.parent.slug.${baseLanguage}.current`,
      level5Slug: `parent.parent.parent.parent.parent.slug.${baseLanguage}.current`,
    },
    prepare({
      title,
      media,
      slug,
      level1Slug,
      level2Slug,
      level3Slug,
      level4Slug,
      level5Slug,
    }: any) {
      return {
        title: `${title}`,
        subtitle: [
          " ",
          level5Slug,
          level4Slug,
          level3Slug,
          level2Slug,
          level1Slug,
          slug,
        ]
          .filter(Boolean)
          .join("/"),
        media,
      };
    },
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [
    PASSWORD,
    PARENT_FIELD,
    TITLE_FIELD,
    {
      ...SLUG_FIELD,
      options: {
        source: "title",
        maxLength: 96,
        localize: true,
        isUnique: isPathUnique,
      },
    },
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
