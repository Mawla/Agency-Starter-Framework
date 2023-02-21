type Props = {
  pascalName: string;
  lowerName: string;
};

export const getModuleQueryImport = ({ pascalName, lowerName }: Props) => {
  return `import { get${pascalName}Query } from "../${"modules"}/${lowerName}/${lowerName}.query";`;
};

export const getModuleQuery = ({ pascalName, lowerName }: Props) => {
  return `      \${get${pascalName}Query(language)},`;
};
