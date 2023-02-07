import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../../types.sanity";
import { pageBase } from "./_page";
import { House } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.home";

export default defineType({
  name: SCHEMA_NAME,
  title: "Homepage",
  type: "document",
  icon: () => <House weight="thin" size={20} />,
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: "hero.0.visual.image1",
    },
    prepare({ title, media }: any) {
      return {
        title: `Home - ${title}`,
        subtitle: `/`,
        media,
      };
    },
  },
  initialValue: {
    ...pageBase.initialValue,
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [...pageBase.fields.filter(({ name }) => name !== "slug")],
});
