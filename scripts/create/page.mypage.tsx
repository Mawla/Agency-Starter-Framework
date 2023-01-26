import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { ORDER_PUBLISHED_DESC, pageBase, PUBLISHED_AT_FIELD } from "./_page";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "MyPageSchema";

export default defineType({
  name: SCHEMA_NAME,
  title: "MyPageTitle",
  type: "document",
  orderings: [ORDER_PUBLISHED_DESC],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: "hero.0.visual.image",
    },
  },
  icon: () => <DocumentIcon type="page" />,
  initialValue: {
    ...pageBase.initialValue,
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [...pageBase.fields, PUBLISHED_AT_FIELD],
});
