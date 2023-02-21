import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getOptionsSnippet } from "./templates/options";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createOptions(
  answers: Pick<AnswersType, "moduleName" | "fields">,
  WRITE = false,
  MODULE_TYPE = "module",
) {
  let { moduleName, fields } = answers;
  let { lowerName } = formatName(moduleName, MODULE_TYPE);
  let filePath = `${__dirname}/../../modules/${lowerName}/${lowerName}.options.ts`;

  if (MODULE_TYPE === "hero") {
    filePath = `${__dirname}/../../heroes/${lowerName}/${lowerName}.options.ts`;
  }

  const lines = getOptionsSnippet({ fields });

  if (WRITE) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
