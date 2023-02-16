type Props = {
  schemaName: string;
  documentId: string;
};

export const getStructureDocumentList = ({ documentId, schemaName }: Props) => {
  return `S.listItem()
    .title($name)
    .icon(getIconForSchema(S, "${schemaName}"))
    .child(
      list(S, { title: "${schemaName}" }).items([
        singleton(S, {
          id: \`${documentId}\`,
          type: "$schemaName",
          language: language.id,
        }),
        documentList(S, {
          type: "$childSchemaName",
          title: "$childName",
          language: language.id,
        }),
      ]),
    ),`;
};
