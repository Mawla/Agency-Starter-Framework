import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { write } from "./get-args";
import { getOptionsSnippet } from "./templates/options";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createOptions(
  answers: Pick<AnswersType, "moduleName" | "fields">,
) {
  let { moduleName, fields } = answers;
  let { lowerName } = formatName(moduleName);

  const lines = getOptionsSnippet({ fields });

  if (write) {
    let filePath = `${__dirname}/../../modules/${lowerName}/${lowerName}.options.ts`;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
