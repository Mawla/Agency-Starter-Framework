import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import {
  DIALOGS_FIELD,
  HERO_FIELD,
  MODULES_FIELD,
  pageBase,
  TITLE_FIELD,
} from "./_page";
import React from "react";

export const SCHEMA_NAME: SchemaName = "page.notfound";

export default {
  name: SCHEMA_NAME,
  title: "404 page",
  type: "document",
  singleton: true,
  icon: () => <DocumentIcon type="notfound" />,
  preview: {
    select: {
      title: `title.${baseLanguage}`,
    },
  },
  initialValue: {
    ...pageBase.initialValue,
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [TITLE_FIELD, HERO_FIELD, MODULES_FIELD, DIALOGS_FIELD],
};
