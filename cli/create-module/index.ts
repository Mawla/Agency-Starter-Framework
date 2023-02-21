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
import { injectBuilder } from "./inject-builder";
import { injectPageQuery } from "./inject-page-query";
import { injectSchema } from "./inject-schema";
import { injectTypes } from "./inject-types";
import { text, intro, outro, isCancel, multiselect } from "@clack/prompts";

const args = process.argv.slice(2);
const WRITE = args.includes("--write");
const MODULE_TYPE = args.includes("--hero") ? "hero" : "module";

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
  if (isCancel(moduleDescription)) process.exit(0);

  let fields = await multiselect({
    message: "Which fields do you want get started with?",
    initialValue: ["title", "eyebrow", "intro", "image"],
    options: [
      { value: "title", label: "Title" },
      { value: "eyebrow", label: "Eyebrow (above title)" },
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

  // can't have an eyebrow without a title
  if (answers.fields.includes("eyebrow") && !answers.fields.includes("title")) {
    answers.fields.push("title");
  }

  // inject snippets in existing files
  injectSchema(answers, WRITE, MODULE_TYPE);
  injectTypes(answers, WRITE, MODULE_TYPE);
  injectPageQuery(answers, WRITE, MODULE_TYPE);
  injectBuilder(answers, WRITE, MODULE_TYPE);

  // create files
  createReactComponent(answers, WRITE, MODULE_TYPE);
  createSchema(answers, WRITE, MODULE_TYPE);
  createQuery(answers, WRITE, MODULE_TYPE);
  createOptions(answers, WRITE, MODULE_TYPE);
  createStory(answers, WRITE, MODULE_TYPE);
  createTests(answers, WRITE, MODULE_TYPE);

  outro(`You're all set!`);
}
