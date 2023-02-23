import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { moduleType, write } from "./get-args";
import { getStorySnippet } from "./templates/story";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createStory(
  answers: Pick<AnswersType, "moduleName" | "fields">,
) {
  let { moduleName, fields } = answers;
  let { lowerName, pascalName } = formatName(moduleName);

  let lines = getStorySnippet({ pascalName, lowerName, fields });

  if (moduleType === "hero") {
    lines = lines.replace('title: "Modules/', 'title: "Heroes/');
  }

  if (write) {
    let filePath = `${__dirname}/../../modules/${lowerName}/${lowerName}.stories.tsx`;
    if (moduleType === "hero") {
      filePath = `${__dirname}/../../heroes/${lowerName}/${lowerName}.stories.tsx`;
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
