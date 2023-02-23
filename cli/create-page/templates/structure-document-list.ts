type Props = {
  schemaName: string;
  pascalName: string;
};

export const getStructureDocumentList = ({ pascalName, schemaName }: Props) => {
  return `documentList(S, {
    type: '${schemaName}',
    title: '${pascalName}',
    language: language.id,
  }),`;
};
