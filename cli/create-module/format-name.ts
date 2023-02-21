import { pascalCase } from "../utils/pascal-case";

export function formatName(name: string, MODULE_TYPE = "module") {
  name = name.trim();
  let pascalName = pascalCase(name).replace(/\s/g, "");
  let lowerName = name.toLowerCase().replace(/\s/g, "");
  let schemaName = `module.${name.toLowerCase()}`.replace(/\s/g, "");

  if (MODULE_TYPE === "hero") {
    schemaName = `hero.${name.toLowerCase()}`.replace(/\s/g, "");
  }

  return {
    pascalName,
    lowerName,
    schemaName,
  };
}
