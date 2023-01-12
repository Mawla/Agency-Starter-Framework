import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { ORDER_PUBLISHED_DESC, pageBase } from "./_page";
import contentPage from "./page.content";
import React from "react";

export const SCHEMA_NAME: SchemaName = "page.jobs";

export default {
  name: SCHEMA_NAME,
  title: "Jobs",
  type: "document",
  singleton: true,
  orderings: [ORDER_PUBLISHED_DESC],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: "hero.0.visual.image1",
    },
  },
  icon: () => <DocumentIcon type="jobs" />,
  initialValue: {
    ...pageBase.initialValue,
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [...contentPage.fields],
};
