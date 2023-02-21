import { pascalCase } from "../utils/pascal-case";

export function formatName(name: string) {
  name = name.trim().replace(/\s\s+/g, "");
  let pascalName = pascalCase(name);
  let lowerName = name.toLowerCase();
  let schemaName = `module.${name.toLowerCase()}`;

  return {
    pascalName,
    lowerName,
    schemaName,
  };
}
