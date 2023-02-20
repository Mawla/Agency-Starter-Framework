type Props = {
  schemaName: string;
  pageName: string;
  parentId: string;
  parentSchemaName: string;
};

export const getArticlePageSchema = ({
  schemaName,
  pageName,
  parentId,
  parentSchemaName,
}: Props) => {
  return `
  import { SchemaName } from "../../../types.sanity";
  import { getStructurePath } from "../../utils/desk/get-structure-path";
  import {
    AUTHOR_FIELD,
    DEFAULT_CONTENT_PAGE_PREVIEW,
    getParentDocumentInitialValue,
    ORDER_PUBLISHED_DESC,
    pageBase,
    PARENT_FIELD,
    PUBLISHED_AT_FIELD,
    TAGS_FIELD,
  } from "./page-fields";
  import { Pages } from "@vectopus/atlas-icons-react";
  import React from "react";
  import { defineType } from "sanity";
  
  export const SCHEMA_NAME: SchemaName = "${schemaName}";
  
  export default defineType({
    name: SCHEMA_NAME,
    title: "${pageName}",
    type: "document",
    orderings: [ORDER_PUBLISHED_DESC],
    preview: DEFAULT_CONTENT_PAGE_PREVIEW,
    icon: () => <Pages weight="thin" size={20} />,
    initialValue: async (props: any, context: any) => {
      return await getParentDocumentInitialValue(context, "${parentId}");
    },
    groups: [...pageBase.groups],
    fields: [
      {
        ...PARENT_FIELD,
        to: [{ type: "${parentSchemaName}" }],
        options: {
          disableNew: true,
          ...PARENT_FIELD.options,
        },
      },
      ...pageBase.fields,
      TAGS_FIELD,
      PUBLISHED_AT_FIELD,
    ],
  });  
`;
};
