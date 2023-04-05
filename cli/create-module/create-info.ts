import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { write } from "./get-args";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createInfo(answers: AnswersType) {
  let { moduleName, moduleTitle, moduleDescription, fields } = answers;
  let { lowerName, schemaName } = formatName(moduleName);

  const lines = JSON.stringify(
    {
      title: moduleTitle,
      description: moduleDescription,
      name: moduleName,
      schemaName: schemaName,
      date: new Date().toISOString(),
      fields: fields,
    },
    null,
    2,
  );

  if (write) {
    let filePath = `${__dirname}/../../modules/${lowerName}/[${moduleTitle}].json`;

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
