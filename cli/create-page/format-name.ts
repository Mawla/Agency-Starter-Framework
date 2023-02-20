import { pascalCase } from "../utils/pascal-case";

export function formatName(name: string) {
  let pascalName = `${pascalCase(name)}`;
  let lowerName = name.toLowerCase();
  let schemaName = `page.${name.toLowerCase().replace(/\s/g, "")}`;
  let documentId = schemaName.replace("page.", "page_");

  return {
    pascalName,
    lowerName,
    schemaName,
    documentId,
  };
}
