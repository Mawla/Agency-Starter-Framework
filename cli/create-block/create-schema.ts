import { AnswersType } from ".";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getSchemaSnippet } from "./templates/schema";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createSchema(
  answers: Pick<
    AnswersType,
    "blockName" | "fields" | "blockDescription" | "blockTitle"
  >,
) {
  let { blockName, fields, blockTitle, blockDescription } = answers;
  let { lowerName, schemaName } = formatName(blockName);

  const lines = getSchemaSnippet({
    blockName,
    blockTitle,
    lowerName,
    schemaName,
    fields,
    blockDescription,
  });

  if (write) {
    let filePath = `${__dirname}/../../blocks/${lowerName}/${lowerName}.schema.tsx`;

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
