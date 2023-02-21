import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getQuerySnippet } from "./templates/query";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createQuery(
  answers: Pick<AnswersType, "moduleName" | "fields">,
  WRITE = false,
  MODULE_TYPE = "module",
) {
  let { moduleName, fields } = answers;
  let { lowerName, pascalName, schemaName } = formatName(
    moduleName,
    MODULE_TYPE,
  );

  const lines = getQuerySnippet({ pascalName, schemaName, fields });

  if (WRITE) {
    let filePath = `${__dirname}/../../modules/${lowerName}/${lowerName}.query.tsx`;
    if (MODULE_TYPE === "hero") {
      filePath = `${__dirname}/../../heroes/${lowerName}/${lowerName}.query.tsx`;
    }
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
