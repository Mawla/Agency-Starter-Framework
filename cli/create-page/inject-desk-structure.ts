/**
 * Add the page to the sanity desk structure
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getStructureCollection } from "./templates/structure-collection";
import { getStructureDocumentList } from "./templates/structure-document-list";
import { getStructureSingleton } from "./templates/structure-singleton";

const fs = require("fs");

export function injectDeskStructure(
  answers: Pick<AnswersType, "pageName" | "pageType" | "articleName">,
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
      offset: -2,
    });
  }

  lines = lines.join("\n");

  if (write) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
