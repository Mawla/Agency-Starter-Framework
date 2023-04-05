type Props = {
  pascalName: string;
  lowerName: string;
  schemaName: string;
};

export const getBlockBuilderImport = ({ pascalName, lowerName }: Props) => {
  return `
  import { ${pascalName}Props } from "../../blocks/${lowerName}/${pascalName}";
  const ${pascalName} = lazy<ComponentType<${pascalName}Props>>(
    () =>
      import(
        /* webpackChunkName: "${pascalName}" */ "../../blocks/${lowerName}/${pascalName}"
      ),
  );`;
};

export const getBuilderComponent = ({ pascalName, schemaName }: Props) => {
  return `
    {item._type === "${schemaName}" && (
      <${pascalName} {...(item as ${pascalName}Props)} />
    )}
  `;
};
