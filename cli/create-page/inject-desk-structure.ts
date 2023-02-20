/**
 * Add the page to the sanity desk structure
 */
import { AnswersType } from "../create-page";
import { formatName } from "../utils/format-name";
import { injectLine } from "../utils/inject-line";
import { prettierFile } from "../utils/prettier-file";
import { getStructureCollection } from "./templates/structure-collection";
import { getStructureDocumentList } from "./templates/structure-document-list";
import { getStructureSingleton } from "./templates/structure-singleton";

const fs = require("fs");

export function injectDeskStructure(
  answers: Pick<AnswersType, "pageName" | "pageType" | "articleName">,
  WRITE = false,
) {
  const { pageName } = answers;
  let { pascalName, schemaName, documentId } = formatName(answers.pageName);

  const filePath = `${__dirname}/../../studio/structure.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  let addition;
  if (answers.pageType === "singleton") {
    addition = getStructureSingleton({
      schemaName,
      documentId,
    });
  }

  if (answers.pageType === "article" || answers.pageType === "content") {
    addition = getStructureDocumentList({
      schemaName,
      pascalName,
    });
  }

  if (answers.pageType === "collection") {
    let articleName = answers.articleName as string;
    let { schemaName: articleSchemaName } = formatName(articleName);

    addition = getStructureCollection({
      schemaName,
      pageName,
      documentId,
      articleName,
      articleSchemaName,
    });
  }

  if (addition) {
    lines = injectLine({
      addition,
      lines,
      needle: `id: "navigation",`,
      adjustLine: -2,
    });
  }

  lines = lines.join("\n");

  if (WRITE) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
