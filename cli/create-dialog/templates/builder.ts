type Props = {
  schemaName: string;
  dialogName: string;
};

export const getBuilderSnippet = ({ schemaName, dialogName }: Props) => {
  return `{item._type === "${schemaName}" && (
    <div>${dialogName}</div>
  )}`;
};
