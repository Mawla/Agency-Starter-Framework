/**
 * Creates an array of paths with types:
 * ['title:string', 'theme:object', 'theme.title:string']
 */

export const getSchemaDefinition = (
  schema: any,
  parent: string | null,
): string[] => {
  return schema.reduce(
    (
      acc: any,
      {
        name,
        type,
      }: {
        name: string;
        type: { jsonType: string; fields?: {}[]; options?: { fields: {}[] } };
      },
    ) => {
      let path = [
        `${[parent, name].filter(Boolean).join(".")}:${type.jsonType || type}`,
      ];
      const parentPath = path[0].split(":")[0];
      if (type.fields)
        path = [...path, ...getSchemaDefinition(type.fields, parentPath)];
      if (type.options?.fields)
        path = [
          ...path,
          ...getSchemaDefinition(type.options?.fields, parentPath),
        ];
      return [...acc, ...path];
    },
    [],
  );
};

/**
 * Check if schema partially matches the definition
 * ['title:string', 'nomatch:object', 'theme.title:nomatch']
 */

export const matchSchema = (schema: any, definition: string[]) => {
  const errors = schema
    .map((schemaItem: string) => {
      const [path, type] = schemaItem.split(":");
      const definitionPath = definition.find(
        (definitionPath: string) => definitionPath.split(":")[0] === path,
      );
      if (!definitionPath) {
        return `Path '${path}' not found`;
      }
      const definitionPathType = definitionPath.split(":")[1];
      if (type !== definitionPathType) {
        return `Incompatible type for '${path}'. Got ${type}, expecting ${definitionPathType}`;
      }
    })
    .filter(Boolean);

  return errors;
};
