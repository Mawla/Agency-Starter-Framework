/**
 * Script to generate new block
 * setting up React component, Sanity schema, tests and storybook file
 *
 * sanity exec ./cli/create-block.ts -- --write
 *
 */
import { BLOCK_SCHEMAS, SCHEMAS } from "../../types.sanity";
import { createInfo } from "./create-info";
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
import { readdirSync } from "fs";

init();

export type AnswersType = {
  blockName: string;
  blockTitle: string;
  blockDescription: string;
  fields?: string[];
};

async function init() {
  intro(`Let's create a block`);

  // read the last block folder name and increment it
  const blocksFolderPath = `${__dirname}/../../blocks/`;
  const finalBlockFolderName = readdirSync(blocksFolderPath, {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name)
    .reverse()
    .find((dirName) => dirName.startsWith("block"));

  const finalBlockFolderIndex = Number(
    finalBlockFolderName?.replace("block", ""),
  );
  let blockIndex = isNaN(finalBlockFolderIndex) ? 1 : finalBlockFolderIndex + 1;
  let blockName = `Block ${blockIndex}`;

  let blockTitle = await text({
    message:
      "What is a user friendly title for the block? (e.g Text and Image)",
    validate(value: string) {
      if (!value || value.trim().length === 0) return `Value is required!`;
    },
  });
  if (isCancel(blockTitle)) process.exit(0);

  let blockDescription = await text({
    message: "What is the description of the block?",
    validate(value: string) {
      if (!value || value.trim().length === 0) return `Value is required!`;
    },
  });
  if (isCancel(blockDescription)) process.exit(0);

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
    blockName: String(blockName),
    blockTitle: String(blockTitle),
    blockDescription: String(blockDescription),
    fields: (fields as any).map(
      (field: { value: string; label: string }) => field.value,
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
  createInfo(answers);

  outro(`You're all set!`);
}
