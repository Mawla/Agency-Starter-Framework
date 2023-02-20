import { AnswersType } from "../create-page";
import { addLine } from "../utils/add-line";
import { formatName } from "../utils/format-name";
import { prettierFile } from "../utils/prettier-file";
import { sortLines } from "../utils/sort-lines";

const fs = require("fs");

/**
 * Add types to types.sanity.ts
 */

export function injectTypes(
  answers: Pick<AnswersType, "pageName">,
  WRITE = false,
) {
  let { schemaName } = formatName(answers.pageName);

  const filePath = `${__dirname}/../../types.sanity.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  // add to schemas list
  lines = addLine({
    addition: `  "${schemaName}": "",`,
    lines,
    needle: "export const SCHEMAS",
  });

  lines = sortLines({
    lines,
    fromNeedle: "export const SCHEMAS",
    toNeedle: "};",
  });

  // add to linkable schemas list
  lines = addLine({
    addition: `  "${schemaName}",`,
    lines,
    needle: "export const LINKABLE_SCHEMAS",
    endNeedle: ");",
    adjustLine: 2,
  });

  lines = sortLines({
    lines,
    fromNeedle: "export const LINKABLE_SCHEMAS",
    toNeedle: ");",
    adjustFromLine: 1,
  });

  lines = lines.join("\n");

  if (WRITE) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
