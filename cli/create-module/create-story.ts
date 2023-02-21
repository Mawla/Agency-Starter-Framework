import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getStorySnippet } from "./templates/story";

/**
 * Create the schema file
 */
const fs = require("fs");

export function createStory(
  answers: Pick<AnswersType, "moduleName" | "fields">,
  WRITE = false,
) {
  let { moduleName, fields } = answers;
  let { lowerName, pascalName } = formatName(moduleName);
  const filePath = `${__dirname}/../../modules/${lowerName}/${lowerName}.stories.tsx`;

  let lines: string | string[] = [];
  lines.push(getStorySnippet({ pascalName, fields }));

  lines = lines.join("\n");

  if (WRITE) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
