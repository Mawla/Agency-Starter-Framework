import { AnswersType } from ".";
import { write } from "../utils/is-write";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { getSchemaSnippet } from "./templates/schema";

/**
 * Create the schema file
 */
const fs = require("fs");
const path = require("path");

export function createSchema(
  answers: Pick<AnswersType, "dialogName" | "dialogDescription">,
) {
  let { dialogName, dialogDescription } = answers;
  let { schemaName } = formatName(dialogName);

  const lines = getSchemaSnippet({
    schemaName,
    dialogName,
    dialogDescription,
  });

  if (write) {
    let filePath = `${__dirname}/../../studio/schemas/documents/${schemaName}.tsx`;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  return lines;
}
