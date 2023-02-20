type Props = {
  schemaName: string;
  pageName: string;
};

export const getContentPageSchema = ({ schemaName, pageName }: Props) => {
  return `
  import { SchemaName } from "../../../types.sanity";
  import {
    DEFAULT_CONTENT_PAGE_ORDERINGS,
    DEFAULT_CONTENT_PAGE_PREVIEW,
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
    icon: () => <Pages weight="thin" size={20} />,
    orderings: DEFAULT_CONTENT_PAGE_ORDERINGS,
    preview: DEFAULT_CONTENT_PAGE_PREVIEW,
    groups: [...pageBase.groups],
    fields: [PARENT_FIELD, ...pageBase.fields],
  });
`;
};
