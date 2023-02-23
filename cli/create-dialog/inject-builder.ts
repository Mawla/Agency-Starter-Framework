/**
 * Add the schema to the schema index file
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { write } from "./get-args";
import { getBuilderSnippet } from "./templates/builder";

const fs = require("fs");

export function injectBuilder(answers: Pick<AnswersType, "dialogName">) {
  let { schemaName } = formatName(answers.dialogName);

  let filePath = `${__dirname}/../../layout/pagebuilder/DialogBuilder.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  lines = injectLine({
    addition: getBuilderSnippet({ schemaName, dialogName: answers.dialogName }),
    lines,
    needle: "</Dialog>",
    offset: 0,
  });

  lines = lines.join("\n");

  if (write) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
