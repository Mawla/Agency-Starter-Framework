import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { isPathUnique } from "../../utils/desk/isPathUnique";
import {
  DIALOGS_FIELD,
  DIALOG_SELECT_FIELD,
  HERO_FIELD,
  HERO_SELECT_FIELD,
  MODULES_FIELD,
  MODULE_SELECT_FIELD,
  pageBase,
  PASSWORD,
  SLUG_FIELD,
  TITLE_FIELD,
} from "./_page";
import { SEO_FIELD } from "./config.seo";
import React from "react";

export const SCHEMA_NAME: SchemaName = "page.content";

export default {
  name: SCHEMA_NAME,
  title: "Content page",
  type: "document",
  icon: () => <DocumentIcon type="page" />,
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
    }) {
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
    {
      name: "parent",
      title: "Parent",
      type: "reference",
      to: [{ type: "page.content" }],
    },
    TITLE_FIELD,
    {
      ...SLUG_FIELD,
      options: {
        source: "title",
        maxLength: 96,
        isUnique: isPathUnique,
      },
    },
    HERO_FIELD,
    HERO_SELECT_FIELD,
    MODULES_FIELD,
    MODULE_SELECT_FIELD,
    DIALOGS_FIELD,
    DIALOG_SELECT_FIELD,
    SEO_FIELD,
    {
      name: "hideNav",
      title: "Hide navigation",
      type: "boolean",
      description: "Option to hide the navigation",
      initialValue: false,
    },
    {
      name: "hideFooter",
      title: "Hide footer",
      type: "boolean",
      description: "Option to hide the footer",
      initialValue: false,
    },
  ],
};
