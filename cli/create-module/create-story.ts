import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getStorySnippet } from "./templates/story";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createStory(
  answers: Pick<AnswersType, "moduleName" | "fields">,
  WRITE = false,
  MODULE_TYPE = "module",
) {
  let { moduleName, fields } = answers;
  let { lowerName, pascalName } = formatName(moduleName, MODULE_TYPE);
  let filePath = `${__dirname}/../../modules/${lowerName}/${lowerName}.stories.tsx`;

  if (MODULE_TYPE === "hero") {
    filePath = `${__dirname}/../../heroes/${lowerName}/${lowerName}.stories.tsx`;
  }

  const lines = getStorySnippet({ pascalName, lowerName, fields });

  if (WRITE) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
