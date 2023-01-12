import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { pageBase } from "./_page";
import React from "react";

export const SCHEMA_NAME: SchemaName = "page.home";

export default {
  name: SCHEMA_NAME,
  title: "Homepage",
  type: "document",
  singleton: true,
  icon: () => <DocumentIcon type="homepage" />,
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: "hero.0.visual.image1",
    },
    prepare({ title, media }) {
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
};
