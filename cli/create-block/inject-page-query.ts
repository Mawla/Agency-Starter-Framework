/**
 * Add the schema to the schema index file
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import {
  getBlockPageQuery,
  getBlockPageQueryImport,
} from "./templates/page-query";

const fs = require("fs");

export function injectPageQuery(answers: Pick<AnswersType, "blockName">) {
  let { pascalName, lowerName } = formatName(answers.blockName);

  const filePath = `${__dirname}/../../queries/page.query.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  let needle = '"blocks": ';
  let imports = getBlockPageQueryImport({ pascalName, lowerName });

  lines.push(imports);
  lines = injectLine({
    addition: getBlockPageQuery({ pascalName, lowerName }),
    lines,
    needle,
    offset: 1,
  });

  lines = lines.join("\n");

  if (write) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
