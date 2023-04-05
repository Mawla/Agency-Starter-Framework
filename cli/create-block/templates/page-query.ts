type Props = {
  pascalName: string;
  lowerName: string;
};

export const getBlockPageQueryImport = ({ pascalName, lowerName }: Props) => {
  return `import { get${pascalName}Query } from "../blocks/${lowerName}/${lowerName}.query";`;
};

export const getBlockPageQuery = ({ pascalName }: Props) => {
  return `      \${get${pascalName}Query(language)},`;
};
