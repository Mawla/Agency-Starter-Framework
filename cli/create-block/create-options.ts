import { AnswersType } from ".";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getOptionsSnippet } from "./templates/options";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createOptions(
  answers: Pick<AnswersType, "blockName" | "fields">,
) {
  let { blockName, fields } = answers;
  let { lowerName } = formatName(blockName);

  const lines = getOptionsSnippet({ fields });

  if (write) {
    let filePath = `${__dirname}/../../blocks/${lowerName}/${lowerName}.options.ts`;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
