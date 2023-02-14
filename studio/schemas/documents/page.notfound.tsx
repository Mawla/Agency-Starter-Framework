import { baseLanguage } from "../../../languages";
import { SchemaName } from "../../../types.sanity";
import {
  DIALOGS_FIELD,
  HERO_FIELD,
  MODULES_FIELD,
  pageBase,
  TITLE_FIELD,
} from "./page-fields";
import { BlockProhibited } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "page.notfound";

export default defineType({
  name: SCHEMA_NAME,
  title: "404 page",
  type: "document",
  icon: () => <BlockProhibited weight="thin" size={20} />,
  preview: {
    select: {
      title: `title.${baseLanguage}`,
    },
  },
  groups: [...pageBase.groups],
  fields: [TITLE_FIELD, HERO_FIELD, MODULES_FIELD, DIALOGS_FIELD],
});
