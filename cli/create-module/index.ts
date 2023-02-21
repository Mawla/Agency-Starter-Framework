/**
 * Script to generate new module
 * setting up React component, Sanity schema, tests and storybook file
 *
 * sanity exec ./cli/create-module.ts -- --write
 *
 */
import { createOptions } from "./create-options";
import { injectQuery } from "./inject-query";
import { injectSchema } from "./inject-schema";
import { text, intro, outro, isCancel, multiselect } from "@clack/prompts";

const args = process.argv.slice(2);
const WRITE = args.includes("--write");

init();

export type AnswersType = {
  moduleName: string;
  moduleDescription: boolean;
  fields: ["title", "intro", "image", "buttons", "items"];
};

async function init() {
  intro(`Let's create a module`);

  let moduleName = await text({
    message: "What is the name of the module?",
    validate(value) {
      if (!value || value.trim().length === 0) return `Value is required!`;
    },
  });
  if (isCancel(moduleName)) process.exit(0);

  let moduleDescription = await text({
    message: "What is the description of the module?",
    validate(value) {
      if (!value || value.trim().length === 0) return `Value is required!`;
    },
  });
  if (isCancel(moduleName)) process.exit(0);

  let fields = await multiselect({
    message: "Which basic fields do you want to set up?",
    options: [
      { value: "title", title: "Title" },
      { value: "intro", title: "Intro" },
      { value: "image", title: "Image" },
      { value: "buttons", title: "Buttons" },
      { value: "items", title: "List of items" },
    ],
  });
  if (isCancel(fields)) process.exit(0);

  const answers = {
    moduleName: String(moduleName),
    moduleDescription: String(moduleDescription),
    fields: Boolean(fields),
  };

  injectSchema(answers, WRITE);
  injectQuery(answers, WRITE);
  createOptions(answers, WRITE);
  // inject module in Module Builder
  // create modules/[name]/Module.tsx
  // create modules/[name]/module.stories.tsx
  // create modules/[name]/module.test.tsx
  // create modules/[name]/module.query.tsx
  // create modules/[name]/module.options.tsx

  outro(`You're all set!`);
}
