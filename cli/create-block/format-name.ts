import { pascalCase } from "../utils/pascal-case";

export function formatName(name: string) {
  name = name.trim();
  let pascalName = pascalCase(name).replace(/\s/g, "");
  let lowerName = name.toLowerCase().replace(/\s/g, "");
  let schemaName = `block.${name.toLowerCase()}`.replace(/\s/g, "");

  return {
    pascalName,
    lowerName,
    schemaName,
  };
}
