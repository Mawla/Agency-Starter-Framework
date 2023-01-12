import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { pageBase, SLUG_FIELD, TITLE_FIELD } from "./_page";
import React from "react";

export const SCHEMA_NAME: SchemaName = "page.office";

export default {
  name: SCHEMA_NAME,
  title: "Office",
  type: "document",
  singleton: false,
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      subtitle: `parent.title.${baseLanguage}`,
      media: "hero.0.visual.image1",
    },
  },
  icon: () => <DocumentIcon type="office" />,
  initialValue: {
    ...pageBase.initialValue,
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [
    {
      name: "parent",
      title: "Location",
      type: "reference",
      to: [{ type: "page.location" }],
    },
    TITLE_FIELD,
    SLUG_FIELD,
  ],
};
