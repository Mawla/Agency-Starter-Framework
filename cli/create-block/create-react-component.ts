import { AnswersType } from ".";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getReactComponentSnippet } from "./templates/react-component";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createReactComponent(
  answers: Pick<AnswersType, "blockName" | "fields">,
) {
  let { blockName, fields } = answers;
  let { lowerName, pascalName } = formatName(blockName);

  let lines = getReactComponentSnippet({ pascalName, lowerName, fields });

  if (write) {
    let filePath = `${__dirname}/../../blocks/${lowerName}/${pascalName}.tsx`;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
