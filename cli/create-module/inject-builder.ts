/**
 * Add the schema to the schema index file
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import {
  getHeroBuilderImport,
  getBuilderComponent,
  getModuleBuilderImport,
} from "./templates/builder";

const fs = require("fs");

export function injectBuilder(
  answers: Pick<AnswersType, "moduleName">,
  WRITE = false,
  MODULE_TYPE = "module",
) {
  let { pascalName, lowerName, schemaName } = formatName(
    answers.moduleName,
    MODULE_TYPE,
  );

  let filePath = `${__dirname}/../../layout/pagebuilder/ModuleBuilder.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  let imports = getModuleBuilderImport({ pascalName, lowerName, schemaName });
  let needle = "</LazyLoadInView>";

  if (MODULE_TYPE === "hero") {
    filePath = `${__dirname}/../../layout/pagebuilder/HeroBuilder.tsx`;
    lines = fs.readFileSync(filePath).toString().split("\n");
    imports = getHeroBuilderImport({ pascalName, lowerName, schemaName });
    needle = "</section>";
  }

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

  if (WRITE) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
