import { AnswersType } from ".";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getTestSnippet } from "./templates/tests";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createTests(
  answers: Pick<AnswersType, "moduleName" | "fields">,
  WRITE = false,
  MODULE_TYPE = "module",
) {
  let { moduleName, fields } = answers;
  let { lowerName, pascalName } = formatName(moduleName, MODULE_TYPE);

  const lines = getTestSnippet({ pascalName, fields });

  if (WRITE) {
    let filePath = `${__dirname}/../../modules/${lowerName}/${lowerName}.test.tsx`;
    if (MODULE_TYPE === "hero") {
      filePath = `${__dirname}/../../heroes/${lowerName}/${lowerName}.test.tsx`;
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
