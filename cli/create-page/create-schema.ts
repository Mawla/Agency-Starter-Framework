import { AnswersType } from "../create-page";
import { formatName } from "../utils/format-name";
import { prettierFile } from "../utils/prettier-file";

/**
 * Create the schema file
 */
const fs = require("fs");

export function createSchema(answers: AnswersType, WRITE = false) {
  let { schemaName } = formatName(answers.name);
  const schemaFilePath = `${__dirname}/../../studio/schemas/documents/${schemaName}.tsx`;

  const schemaContent = schemaName;

  if (WRITE) {
    fs.writeFileSync(schemaFilePath, schemaContent);
    prettierFile(schemaFilePath);
  }
}
