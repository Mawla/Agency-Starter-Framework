/**
 * Add the schema to the schema index file
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import {
  getModuleBuilderComponent,
  getModuleBuilderImport,
} from "./templates/module-builder";

const fs = require("fs");

export function injectModuleBuilder(
  answers: Pick<AnswersType, "moduleName">,
  WRITE = false,
) {
  let { pascalName, lowerName, schemaName } = formatName(answers.moduleName);

  const filePath = `${__dirname}/../../layout/modulebuilder/ModuleBuilder.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  lines = [
    getModuleBuilderImport({ pascalName, lowerName, schemaName }),
    ...lines,
  ];

  lines = injectLine({
    addition: getModuleBuilderComponent({
      pascalName,
      lowerName,
      schemaName,
    }),
    lines,
    needle: "</LazyLoadInView>",
    offset: -1,
  });

  lines = lines.join("\n");

  if (WRITE) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
