import { AnswersType } from ".";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getArticlePageSchema } from "./templates/article-page";
import { getContentPageSchema } from "./templates/content-page";
import { getSingletonPageSchema } from "./templates/singleton-page";

/**
 * Create the schema file
 */
const fs = require("fs");

export function createSchema(
  answers: Pick<AnswersType, "pageName" | "pageType" | "parentType">,
) {
  let { pageName } = answers;
  let { schemaName } = formatName(pageName);
  const filePath = `${__dirname}/../../studio/schemas/documents/${schemaName}.tsx`;

  let lines: string | string[] = [];

  if (answers.pageType === "content") {
    lines.push(
      getContentPageSchema({
        schemaName,
        pageName,
      }),
    );
  }

  if (answers.pageType === "article") {
    let { parentType } = answers;
    let parentId = parentType
      ? parentType.replace("page.", "page_")
      : undefined;

    lines.push(
      getArticlePageSchema({
        schemaName,
        pageName,
        parentId,
        parentSchemaName: parentType,
      }),
    );
  }

  if (answers.pageType === "singleton") {
    lines.push(
      getSingletonPageSchema({
        schemaName,
        pageName,
      }),
    );
  }

  lines = lines.join("\n");

  if (write) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
