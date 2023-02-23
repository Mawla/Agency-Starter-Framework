import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { moduleType, write } from "./get-args";
import { getReactComponentSnippet } from "./templates/react-component";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createReactComponent(
  answers: Pick<AnswersType, "moduleName" | "fields">,
) {
  let { moduleName, fields } = answers;
  let { lowerName, pascalName } = formatName(moduleName);

  let lines = getReactComponentSnippet({ pascalName, lowerName, fields });

  if (moduleType === "hero") {
    lines = lines.replace("theme?.title?.level", 'theme?.title?.level || "h1"');
  }

  if (write) {
    let filePath = `${__dirname}/../../modules/${lowerName}/${pascalName}.tsx`;
    if (moduleType === "hero") {
      filePath = `${__dirname}/../../heroes/${lowerName}/${pascalName}.tsx`;
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
