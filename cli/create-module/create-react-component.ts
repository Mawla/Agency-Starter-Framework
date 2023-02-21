import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getReactComponentSnippet } from "./templates/react-component";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createReactComponent(
  answers: Pick<AnswersType, "moduleName" | "fields">,
  WRITE = false,
  MODULE_TYPE = "module",
) {
  let { moduleName, fields } = answers;
  let { lowerName, pascalName } = formatName(moduleName, MODULE_TYPE);

  let lines = getReactComponentSnippet({ pascalName, lowerName, fields });

  if (MODULE_TYPE === "hero") {
    lines = lines.replace("theme?.title?.level", 'theme?.title?.level || "h1"');
  }

  if (WRITE) {
    let filePath = `${__dirname}/../../modules/${lowerName}/${pascalName}.tsx`;

    if (MODULE_TYPE === "hero") {
      filePath = `${__dirname}/../../heroes/${lowerName}/${pascalName}.tsx`;
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
