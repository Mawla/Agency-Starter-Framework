/**
 * Script to generate new module
 * setting up React component, Sanity schema, tests and storybook file
 *
 * sanity exec ./cli/create-module.ts -- --write
 *
 */
import { createOptions } from "./create-options";
import { createQuery } from "./create-query";
import { createReactComponent } from "./create-react-component";
import { createSchema } from "./create-schema";
import { createStory } from "./create-story";
import { createTests } from "./create-tests";
import { injectModuleBuilder } from "./inject-module-builder";
import { injectPageQuery } from "./inject-page-query";
import { injectSchema } from "./inject-schema";
import { injectTypes } from "./inject-types";
import { text, intro, outro, isCancel, multiselect } from "@clack/prompts";

const args = process.argv.slice(2);
const WRITE = args.includes("--write");

init();

export type AnswersType = {
  moduleName: string;
  moduleDescription: string;
  fields?: string[];
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
    message: "Which fields do you want get started with?",
    initialValue: ["title", "intro", "image"],
    options: [
      { value: "title", label: "Title" },
      { value: "intro", label: "Intro" },
      { value: "image", label: "Image" },
      { value: "buttons", label: "Buttons" },
      { value: "items", label: "Generic list of items" },
    ],
  });
  if (isCancel(fields)) process.exit(0);

  const answers = {
    moduleName: String(moduleName),
    moduleDescription: String(moduleDescription),
    fields: (fields as any).map(
      (field: { value: string; label: string }) => field.value,
    ),
  };

  // inject snippets in existing files
  injectSchema(answers, WRITE);
  injectTypes(answers, WRITE);
  injectPageQuery(answers, WRITE);
  injectModuleBuilder(answers, WRITE);

  // create files
  createReactComponent(answers, WRITE);
  createSchema(answers, WRITE);
  createQuery(answers, WRITE);
  createOptions(answers, WRITE);
  createStory(answers, WRITE);
  createTests(answers, WRITE);

  outro(`You're all set!`);
}
