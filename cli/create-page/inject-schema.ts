/**
 * Add the schema to the schema index file
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { sortLines } from "../utils/sort-lines";
import { formatName } from "./format-name";

const fs = require("fs");
const path = require("path");

export function injectSchema(answers: Pick<AnswersType, "pageName">) {
  let { pascalName, schemaName } = formatName(answers.pageName);

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
  lines = injectLine({
    addition: `    ${schemaImportName},`,
    lines,
    needle: fromNeedle,
  });
  lines = sortLines({ lines, fromNeedle, toNeedle });
  lines = lines.join("\n");

  if (write) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
