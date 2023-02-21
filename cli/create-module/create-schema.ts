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
) {
  let { moduleName, fields, moduleDescription } = answers;
  let { lowerName, pascalName, schemaName } = formatName(moduleName);
  const filePath = `${__dirname}/../../modules/${lowerName}/${lowerName}.schema.tsx`;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const lines = getSchemaSnippet({
    moduleName,
    lowerName,
    schemaName,
    fields,
    moduleDescription,
  });

  if (WRITE) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
