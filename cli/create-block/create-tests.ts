import { AnswersType } from ".";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getTestSnippet } from "./templates/tests";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createTests(
  answers: Pick<AnswersType, "blockName" | "fields">,
) {
  let { blockName, fields } = answers;
  let { lowerName, pascalName } = formatName(blockName);

  const lines = getTestSnippet({ pascalName, fields });

  if (write) {
    let filePath = `${__dirname}/../../blocks/${lowerName}/${lowerName}.test.tsx`;

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
