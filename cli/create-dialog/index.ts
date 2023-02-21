/**
 * Script to generate new Sanity dialog
 * and insert it in types and sanity schemas index, add queries and insert in page builder
 *
 * sanity exec ./cli/create-dialog.ts -- --write
 *
 */
import { createSchema } from "./create-schema";
import { injectBuilder } from "./inject-builder";
import { injectPageQuery } from "./inject-page-query";
import { injectSchema } from "./inject-schema";
import { injectTypes } from "./inject-types";
import { text, intro, outro, isCancel } from "@clack/prompts";

const args = process.argv.slice(2);
const WRITE = args.includes("--write");

init();

export type AnswersType = {
  dialogName: string;
  dialogDescription: string;
};

async function init() {
  intro(`Let's create a page`);

  let dialogName = await text({
    message: `What is the name of the dialog?`,
    validate(value) {
      if (!value || value.trim().length === 0) return `Value is required!`;
    },
  });
  if (isCancel(dialogName)) process.exit(0);

  let dialogDescription = await text({
    message: `Human readable form. 'My Dialog' will become schema name 'dialog.mydialog'.`,
    validate(value) {
      if (!value || value.trim().length === 0) return `Value is required!`;
    },
  });
  if (isCancel(dialogDescription)) process.exit(0);

  const answers = {
    dialogName: String(dialogName),
    dialogDescription: String(dialogDescription),
  };

  injectTypes(answers, WRITE);
  injectSchema(answers, WRITE);
  injectPageQuery(answers, WRITE);
  injectBuilder(answers, WRITE);
  createSchema(answers, WRITE);

  outro(`You're all set!`);
}
