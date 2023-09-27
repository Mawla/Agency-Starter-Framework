type Props = {
  schemaName: string;
  pageName: string;
};

export const getSingletonPageSchema = ({ schemaName, pageName }: Props) => {
  return `
  import { SchemaName } from "../../../types.sanity";
  import {
    DEFAULT_CONTENT_PAGE_PREVIEW,
    getI18nBaseFieldForSingleton,
    pageBase,
    PARENT_FIELD,
  } from "./page-fields";
  import { Pages } from "@vectopus/atlas-icons-react";
  import React from "react";
  import { defineType } from "sanity";
  
  export const SCHEMA_NAME: SchemaName = "${schemaName}";
  
  export default defineType({
    name: SCHEMA_NAME,
    title: "${pageName}",
    type: "document",
    options: {
      singleton: true,
    },
    preview: DEFAULT_CONTENT_PAGE_PREVIEW,
    icon: () => <Pages weight="thin" size={20} />,
    groups: [...pageBase.groups],
    fields: [
      PARENT_FIELD,
      ...pageBase.fields.map((field) => {
        if (field.name === "i18n_base") {
          return getI18nBaseFieldForSingleton(SCHEMA_NAME);
        }
        return { ...field };
      }),
    ],
  });
`;
};
