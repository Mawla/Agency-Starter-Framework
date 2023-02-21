type Props = {
  schemaName: string;
};

export const getPageQuerySnippet = ({ schemaName }: Props) => {
  return `      _type == "${schemaName}" => { title }`;
};
