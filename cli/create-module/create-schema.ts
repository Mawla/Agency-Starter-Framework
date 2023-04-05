import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { moduleType, write } from "./get-args";
import { getSchemaSnippet } from "./templates/schema";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createSchema(
  answers: Pick<
    AnswersType,
    "moduleName" | "fields" | "moduleDescription" | "moduleTitle"
  >,
) {
  let { moduleName, fields, moduleTitle, moduleDescription } = answers;
  let { lowerName, schemaName } = formatName(moduleName);

  const lines = getSchemaSnippet({
    moduleName,
    moduleTitle,
    lowerName,
    schemaName,
    fields,
    moduleDescription,
  });

  if (write) {
    let filePath = `${__dirname}/../../modules/${lowerName}/${lowerName}.schema.tsx`;
    if (moduleType === "hero") {
      filePath = `${__dirname}/../../heroes/${lowerName}/${lowerName}.schema.tsx`;
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
