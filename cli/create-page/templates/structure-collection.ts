type Props = {
  documentId: string;
  schemaName: string;
  pageName: string;
  articleName: string;
  articleSchemaName: string;
};

export const getStructureCollection = ({
  documentId,
  pageName,
  schemaName,
  articleName,
  articleSchemaName,
}: Props) => {
  return `S.listItem()
    .title("${pageName}")
    .icon(getIconForSchema(S, "${schemaName}"))
    .child(
      list(S, { title: "${pageName}" }).items([
        singleton(S, {
          id: \`${documentId}\`,
          type: "${schemaName}",
          language: language.id,
        }),
        documentList(S, {
          type: "${articleSchemaName}",
          title: "${articleName}",
          language: language.id,
        }),
      ]),
    ),`;
};
