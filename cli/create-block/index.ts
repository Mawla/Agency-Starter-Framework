/**
 * Script to generate new block
 * setting up React component, Sanity schema, tests and storybook file
 *
 * sanity exec ./cli/create-block.ts -- --write
 *
 */
import { createInfo } from "./create-info";
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
import { readdirSync, mkdirSync, existsSync } from "fs";

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

  if (!existsSync(blocksFolderPath)) {
    mkdirSync(blocksFolderPath);
  }

  const blockFolderNumbers = readdirSync(blocksFolderPath, {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => +name.replace("block", ""))
    .filter((name) => !isNaN(name))
    .sort((a, b) => a - b)
    .reverse();

  const highestBlockIndex = Math.max(...blockFolderNumbers) || 1;
  let blockIndex = isFinite(highestBlockIndex) ? highestBlockIndex + 1 : 1;

  let customBlockIndex = await text({
    message: "What is the block number? (e.g 1, 2, 3 or 51)",
    placeholder: blockIndex.toString(),
  });
  if (isCancel(customBlockIndex)) process.exit(0);

  let blockName = `Block ${customBlockIndex || blockIndex}`;

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
    initialValue: ["title", "intro", "buttons"],
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
    blockName: String(blockName),
    blockTitle: String(blockTitle),
    blockDescription: String(blockDescription),
    fields: (fields as any).map(
      (field: { value: string; label: string }) => field.value,
    ),
  };

  // inject snippets in existing files
  injectSchema(answers);
  injectTypes(answers);
  injectPageQuery(answers);
  injectBuilder(answers);

  // create files
  createReactComponent(answers);
  createSchema(answers);
  createQuery(answers);
  createStory(answers);
  createTests(answers);
  createInfo(answers);

  outro(`
  You're all set!

  › Don't forget to replace the default schema icon with a custom one from https://atlasicons.vectopus.com.
  
  `);
}
