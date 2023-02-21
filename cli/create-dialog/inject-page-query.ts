/**
 * Add the schema to the schema index file
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";

const fs = require("fs");

export function injectPageQuery(
  answers: Pick<AnswersType, "dialogName">,
  WRITE = false,
) {
  let { schemaName } = formatName(answers.dialogName);

  const filePath = `${__dirname}/../../queries/page.query.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  let needle = "dialogs {";

  lines = injectLine({
    addition: `_type == "${schemaName}" => { ... }`,
    lines,
    needle,
    offset: 1,
  });

  lines = lines.join("\n");

  if (WRITE) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
