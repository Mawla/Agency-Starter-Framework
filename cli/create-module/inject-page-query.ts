/**
 * Add the schema to the schema index file
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import {
  getHeroPageQueryImport,
  getModulePageQuery,
  getModulePageQueryImport,
} from "./templates/page-query";

const fs = require("fs");

export function injectPageQuery(
  answers: Pick<AnswersType, "moduleName">,
  WRITE = false,
  MODULE_TYPE = "module",
) {
  let { pascalName, lowerName } = formatName(answers.moduleName, MODULE_TYPE);

  const filePath = `${__dirname}/../../queries/page.query.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  let needle = '"modules": ';
  let addition = getModulePageQuery({ pascalName, lowerName });

  if (MODULE_TYPE === "hero") {
    needle = '"hero":';
    addition = getHeroPageQueryImport({ pascalName, lowerName });
  }

  lines.push(getModulePageQueryImport({ pascalName, lowerName }));
  lines = injectLine({
    addition: getModulePageQuery({ pascalName, lowerName }),
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
