/**
 * Add the page to the sanity desk structure
 */
import { AnswersType } from "../create-page";
import { addLine } from "../utils/add-line";
import { formatName } from "../utils/format-name";
import { prettierFile } from "../utils/prettier-file";
import { getStructureDocumentList } from "./templates/page/structure-document-list";
import { getStructureSingleton } from "./templates/page/structure-singleton";

const fs = require("fs");

export function injectDeskStructure(answers: AnswersType, WRITE = false) {
  let { pascalName, schemaName, documentId } = formatName(answers.name);

  const filePath = `${__dirname}/../../studio/structure.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  if (answers.addToDesk) {
    let addition;
    if (answers.isSingleton) {
      addition = getStructureSingleton({
        schemaName,
        documentId,
      });
    }

    if (!answers.isSingleton) {
      addition = getStructureDocumentList({
        schemaName,
        pascalName,
      });
    }

    if (addition) {
      lines = addLine({
        addition,
        lines,
        needle: `id: "navigation",`,
        adjustLine: -2,
      });
    }
  }

  lines = lines.join("\n");

  if (WRITE) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
