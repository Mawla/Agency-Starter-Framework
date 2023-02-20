/**
 * Add the schema to the schema index file
 */
import { AnswersType } from "../create-page";
import { addLine } from "../utils/add-line";
import { formatName } from "../utils/format-name";
import { prettierFile } from "../utils/prettier-file";
import { sortLines } from "../utils/sort-lines";

const fs = require("fs");
const path = require("path");

export function injectSchema(answers: AnswersType, WRITE = false) {
  let { pascalName, schemaName } = formatName(answers.name);

  const filePath = path.resolve(`${__dirname}../../../studio/schemas/index.ts`);
  const file = fs.readFileSync(filePath).toString();
  let lines = file.split("\n");

  const schemaImportName = `page${pascalName}`;
  const importPath = `./documents/${schemaName}`;

  // add import: place doesn't matter, prettier will take care of it
  lines = [`import ${schemaImportName} from "${importPath}";`, ...lines];
  const fromNeedle = `...[`;
  const toNeedle = `],`;

  // add to schemas list
  lines = addLine({
    addition: `    ${schemaImportName},`,
    lines,
    needle: fromNeedle,
  });
  lines = sortLines({ lines, fromNeedle, toNeedle });
  lines = lines.join("\n");

  if (WRITE) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
