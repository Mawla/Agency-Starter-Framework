import { AnswersType } from "../create-page";
import { formatName } from "../utils/format-name";
import { prettierFile } from "../utils/prettier-file";
import { getArticlePageSchema } from "./templates/article-page";
import { getContentPageSchema } from "./templates/content-page";
import { getSingletonPageSchema } from "./templates/singleton-page";

/**
 * Create the schema file
 */
const fs = require("fs");

export function createSchema(
  answers: Pick<AnswersType, "pageName" | "pageType">,
  WRITE = false,
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
    lines.push(
      getArticlePageSchema({
        schemaName,
        pageName,
        parentId: "page_blogs",
        parentSchemaName: "page.blogs",
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

  if (WRITE) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
