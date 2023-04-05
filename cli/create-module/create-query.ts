import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { write } from "./get-args";
import { getQuerySnippet } from "./templates/query";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createQuery(
  answers: Pick<AnswersType, "moduleName" | "fields">,
) {
  let { moduleName, fields } = answers;
  let { lowerName, pascalName, schemaName } = formatName(moduleName);

  const lines = getQuerySnippet({ pascalName, schemaName, fields });

  if (write) {
    let filePath = `${__dirname}/../../modules/${lowerName}/${lowerName}.query.tsx`;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
