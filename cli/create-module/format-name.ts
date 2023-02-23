import { pascalCase } from "../utils/pascal-case";
import { moduleType } from "./get-args";

export function formatName(name: string) {
  name = name.trim();
  let pascalName = pascalCase(name).replace(/\s/g, "");
  let lowerName = name.toLowerCase().replace(/\s/g, "");
  let schemaName = `module.${name.toLowerCase()}`.replace(/\s/g, "");

  if (moduleType === "hero") {
    schemaName = `hero.${name.toLowerCase()}`.replace(/\s/g, "");
  }

  return {
    pascalName,
    lowerName,
    schemaName,
  };
}
