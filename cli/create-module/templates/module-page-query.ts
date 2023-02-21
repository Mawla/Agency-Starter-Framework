type Props = {
  pascalName: string;
  lowerName: string;
};

export const getModulePageQueryImport = ({ pascalName, lowerName }: Props) => {
  return `import { get${pascalName}Query } from "../${"modules"}/${lowerName}/${lowerName}.query";`;
};

export const getModulePageQuery = ({ pascalName, lowerName }: Props) => {
  return `      \${get${pascalName}Query(language)},`;
};
