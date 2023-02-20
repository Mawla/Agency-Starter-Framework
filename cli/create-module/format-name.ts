import { pascalCase } from "../utils/pascal-case";

export function formatName(name: string) {
  let pascalName = `${pascalCase(name)}`;
  let lowerName = name.toLowerCase();
  let schemaName = `module.${name.toLowerCase().replace(/\s/g, "")}`;

  return {
    pascalName,
    lowerName,
    schemaName,
  };
}
