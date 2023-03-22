/**
 * Script to generate new module
 * setting up React component, Sanity schema, tests and storybook file
 *
 * sanity exec ./cli/create-module.ts -- --write
 *
 */
import { MODULE_SCHEMAS } from "../../types.sanity";
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

init();

export type AnswersType = {
  moduleName: string;
  moduleDescription: string;
  fields?: string[];
};

async function init() {
  intro(`Let's create a module`);

  const moduleTypes = Object.keys(MODULE_SCHEMAS);
  let moduleName = `Block ${moduleTypes.length}`;

  let moduleDescription = await text({
    message: "What is the description of the module?",
    validate(value: string) {
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
      (field: { value: string; label: string }) => field.value
    ),
  };

  // can't have an eyebrow without a title
  if (answers.fields.includes("eyebrow") && !answers.fields.includes("title")) {
    answers.fields.push("title");
  }

  // inject snippets in existing files
  injectSchema(answers);
  injectTypes(answers);
  injectPageQuery(answers);
  injectBuilder(answers);

  // create files
  createReactComponent(answers);
  createSchema(answers);
  createQuery(answers);
  createOptions(answers);
  createStory(answers);
  createTests(answers);

  outro(`You're all set!`);
}
