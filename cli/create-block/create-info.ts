import { AnswersType } from ".";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createInfo(answers: AnswersType) {
  let { blockName, blockTitle, blockDescription, fields } = answers;
  let { lowerName, schemaName } = formatName(blockName);

  const lines = JSON.stringify(
    {
      title: blockTitle,
      description: blockDescription,
      name: blockName,
      schemaName: schemaName,
      date: new Date().toISOString(),
      fields: fields,
    },
    null,
    2,
  );

  if (write) {
    let filePath = `${__dirname}/../../blocks/${lowerName}/[${blockTitle}].json`;

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
