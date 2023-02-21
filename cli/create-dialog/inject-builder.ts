/**
 * Add the schema to the schema index file
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";

const fs = require("fs");

export function injectBuilder(
  answers: Pick<AnswersType, "dialogName">,
  WRITE = false,
) {
  let { schemaName } = formatName(answers.dialogName);

  let filePath = `${__dirname}/../../layout/pagebuilder/ModuleBuilder.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  lines = injectLine({
    addition: `{item._type === "${schemaName}" && (
      <div>${answers.dialogName}</div>
    )}`,
    lines,
    needle: "</Dialog>",
    offset: 0,
  });

  lines = lines.join("\n");

  if (WRITE) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
