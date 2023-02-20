/**
 * Script to generate new Sanity page
 * and insert it in types and sanity schemas index
 *
 * sanity exec ./cli/create-page.ts -- --write
 * NODE_ENV=test npx jest ./cli/create-page.test.ts
 *
 */
import { createSchema } from "./create-page/create-schema";
import { injectDeskStructure } from "./create-page/inject-desk-structure";
import { injectSchema } from "./create-page/inject-schema";
import { injectTypes } from "./create-page/inject-types";
import { text, intro, outro, confirm, isCancel } from "@clack/prompts";

const args = process.argv.slice(2);
const WRITE = args.includes("--write");

if (WRITE) {
  init();
}

export type AnswersType = {
  name: string;
  isSingleton: boolean;
  addToDesk: boolean;
};

async function init() {
  intro(`Let's create a single use page`);

  let name = await text({
    message: `What is the name of the page? (e.g. "Blogs")`,
    validate(value) {
      if (!value || value.trim().length === 0) return `Value is required!`;
    },
  });
  if (isCancel(name)) process.exit(0);

  let isSingleton = await confirm({
    message: "Is it a single use item, like the homepage or blog overview?",
  });
  if (isCancel(isSingleton)) process.exit(0);

  let addToDesk = await confirm({
    message: "Do you want to add it to the studio desk structure?",
  });
  if (isCancel(addToDesk)) process.exit(0);

  name = String(name);

  const answers = {
    name: String(name),
    isSingleton: Boolean(isSingleton),
    addToDesk: Boolean(addToDesk),
  };

  if (isCancel(answers)) return;

  injectTypes(answers, WRITE);
  injectSchema(answers, WRITE);
  injectDeskStructure(answers, WRITE);
  createSchema(answers, WRITE);

  outro(`You're all set!`);
}
