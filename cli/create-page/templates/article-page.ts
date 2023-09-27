type Props = {
  schemaName: string;
  pageName: string;
  parentId?: string;
  parentSchemaName?: string;
};

const getParentInitialValue = (
  parentId: string,
) => `initialValue: async (props: any, context: any) => {
    return await getParentDocumentInitialValue(context, "${parentId}");
  }
`;

const getParentFieldOptions = (
  parentSchemaName: string,
) => `to: [{ type: "${parentSchemaName}" }],
  options: {
    disableNew: true,
    ...PARENT_FIELD.options,
  }
`;

export const getArticlePageSchema = ({
  schemaName,
  pageName,
  parentId,
  parentSchemaName,
}: Props) => {
  return `
  import { SchemaName } from "../../../types.sanity";
  import {
    DEFAULT_CONTENT_PAGE_PREVIEW,
    getParentDocumentInitialValue,
    DEFAULT_ARTICLE_PAGE_ORDERINGS,
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
    orderings: DEFAULT_ARTICLE_PAGE_ORDERINGS,
    preview: DEFAULT_CONTENT_PAGE_PREVIEW,
    icon: () => <Pages weight="thin" size={20} />,
    ${parentId && getParentInitialValue(parentId)},
    groups: [...pageBase.groups],
    fields: [
      {
        ...PARENT_FIELD,
        ${parentSchemaName && getParentFieldOptions(parentSchemaName)}
      },
      ...pageBase.fields,
      TAGS_FIELD,
      PUBLISHED_AT_FIELD,
    ],
  });  
`;
};
