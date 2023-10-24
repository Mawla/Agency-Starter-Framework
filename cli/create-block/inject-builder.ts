/**
 * Add the schema to the schema index file
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import {
  getBuilderComponent,
  getBlockBuilderImport,
} from "./templates/builder";

const fs = require("fs");

export function injectBuilder(answers: Pick<AnswersType, "blockName">) {
  let { pascalName, lowerName, schemaName } = formatName(answers.blockName);

  let filePath = `${__dirname}/../../layout/pagebuilder/BlockBuilder.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  let imports = getBlockBuilderImport({ pascalName, lowerName, schemaName });
  let needle = "</BlockLoadInView>";

  lines = [imports, ...lines];

  lines = injectLine({
    addition: getBuilderComponent({
      pascalName,
      lowerName,
      schemaName,
    }),
    lines,
    needle,
    offset: 0,
  });

  lines = lines.join("\n");

  if (write) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
