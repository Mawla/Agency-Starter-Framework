type Props = {
  documentId: string;
  schemaName: string;
};

export const getStructureSingleton = ({ documentId, schemaName }: Props) => {
  return `singleton(S, {
    id: '${documentId}',
    type: '${schemaName}',
    language: language.id,
  }),`;
};
