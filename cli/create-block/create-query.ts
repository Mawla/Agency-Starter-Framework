import { AnswersType } from ".";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getQuerySnippet } from "./templates/query";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createQuery(
  answers: Pick<AnswersType, "blockName" | "fields">,
) {
  let { blockName, fields } = answers;
  let { lowerName, pascalName, schemaName } = formatName(blockName);

  const lines = getQuerySnippet({ pascalName, schemaName, fields });

  if (write) {
    let filePath = `${__dirname}/../../blocks/${lowerName}/${lowerName}.query.tsx`;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
