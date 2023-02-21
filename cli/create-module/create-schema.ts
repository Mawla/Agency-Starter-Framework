import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getSchemaSnippet } from "./templates/schema";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createSchema(
  answers: Pick<AnswersType, "moduleName" | "fields" | "moduleDescription">,
  WRITE = false,
  MODULE_TYPE = "module",
) {
  let { moduleName, fields, moduleDescription } = answers;
  let { lowerName, schemaName } = formatName(moduleName, MODULE_TYPE);

  const lines = getSchemaSnippet({
    moduleName,
    lowerName,
    schemaName,
    fields,
    moduleDescription,
  });

  if (WRITE) {
    let filePath = `${__dirname}/../../modules/${lowerName}/${lowerName}.schema.tsx`;
    if (MODULE_TYPE === "hero") {
      filePath = `${__dirname}/../../heroes/${lowerName}/${lowerName}.schema.tsx`;
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
