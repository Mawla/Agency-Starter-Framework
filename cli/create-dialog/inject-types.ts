import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { sortLines } from "../utils/sort-lines";
import { formatName } from "./format-name";

const fs = require("fs");

/**
 * Add types to types.sanity.ts
 */

export function injectTypes(answers: Pick<AnswersType, "dialogName">) {
  let { schemaName } = formatName(answers.dialogName);

  const filePath = `${__dirname}/../../types.sanity.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  // add to schemas list
  lines = injectLine({
    addition: `  "${schemaName}": "",`,
    lines,
    needle: "export const SCHEMAS",
  });

  lines = sortLines({
    lines,
    fromNeedle: "export const SCHEMAS",
    toNeedle: "};",
  });

  const needle = "export const DIALOG_SCHEMAS";

  // add to linkable schemas list
  lines = injectLine({
    addition: `  "${schemaName}",`,
    lines,
    needle,
    delimiter: ");",
    offset: 2,
  });

  lines = sortLines({
    lines,
    fromNeedle: needle,
    toNeedle: ");",
    adjustFromLine: 1,
  });

  lines = lines.join("\n");

  if (write) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
