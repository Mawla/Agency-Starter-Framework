/**
 * Add the schema to the schema index file
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { write } from "./get-args";
import {
  getModulePageQuery,
  getModulePageQueryImport,
} from "./templates/page-query";

const fs = require("fs");

export function injectPageQuery(answers: Pick<AnswersType, "moduleName">) {
  let { pascalName, lowerName } = formatName(answers.moduleName);

  const filePath = `${__dirname}/../../queries/page.query.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  let needle = '"modules": ';
  let imports = getModulePageQueryImport({ pascalName, lowerName });

  lines.push(imports);
  lines = injectLine({
    addition: getModulePageQuery({ pascalName, lowerName }),
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
