/**
 * Add the schema to the schema index file
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";

const fs = require("fs");

export function injectQuery(
  answers: Pick<AnswersType, "moduleName">,
  WRITE = false,
) {
  let { pascalName, lowerName } = formatName(answers.moduleName);

  const filePath = `${__dirname}/../../queries/page.query.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  lines.push(
    `import { get${pascalName}Query } from "../${"modules"}/${lowerName}/${lowerName}.query";`,
  );
  lines = injectLine({
    addition: `    \${get${pascalName}Query(language)},`,
    lines,
    needle: '"modules":',
    adjustLine: -3,
  });

  lines = lines.join("\n");

  if (WRITE) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
