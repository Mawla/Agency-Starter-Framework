type Props = {
  pascalName: string;
  lowerName: string;
  schemaName: string;
};

export const getModuleBuilderImport = ({ pascalName, lowerName }: Props) => {
  return `
  import { ${pascalName}Props } from "../../modules/${lowerName}/${pascalName}";
  const ${pascalName} = lazy<ComponentType<${pascalName}Props>>(
    () =>
      import(
        /* webpackChunkName: "${pascalName}" */ "../../modules/${lowerName}/${pascalName}"
      ),
  );`;
};

export const getModuleBuilderComponent = ({
  pascalName,
  schemaName,
}: Props) => {
  return `
    {item._type === "${schemaName}" && (
      <${pascalName} {...(item as ${pascalName}Props)} />
    )}
  `;
};
