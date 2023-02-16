import { getStructureDocumentList } from "./templates/page/structure-document-list";
import { getStructureSingleton } from "./templates/page/structure-singleton";
import { addLine } from "./utils/add-line";
import { formatName } from "./utils/format-name";
import { prettierFile } from "./utils/prettier-file";
import { sortLines } from "./utils/sort-lines";
import { text, intro, outro, confirm } from "@clack/prompts";

const args = process.argv.slice(2);
const IS_TEST = args.includes("--test");

const fs = require("fs");
const path = require("path");

type AnswersType = {
  name: string;
  isSingleton: boolean;
  hasChildren?: boolean;
  childName?: string;
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

  let isSingleton = await confirm({
    message: "Is it a single use item, like the homepage or blog overview?",
  });

  let addToDesk = await confirm({
    message: "Do you want to add it to the studio desk structure?",
  });

  name = String(name);

  const answers = {
    name: String(name),
    isSingleton: Boolean(isSingleton),
    addToDesk: Boolean(addToDesk),
  };

  injectTypes(answers);
  injectSchema(answers);
  injectDeskStructure(answers);
  createSchema(answers);

  outro(`You're all set!`);
}

/**
 * Add types to types.sanity.ts
 */

export function injectTypes(answers: AnswersType) {
  let { pascalName, lowerName, schemaName, documentId } = formatName(
    answers.name,
  );

  const filePath = `${__dirname}/../types.sanity.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  // add to schemas list
  lines = addLine({
    addition: `  '${schemaName}': '',`,
    lines,
    needle: "export const SCHEMAS",
  });

  lines = sortLines({
    lines,
    fromNeedle: "export const SCHEMAS",
    toNeedle: "};",
  });

  // add to linkable schemas list
  lines = addLine({
    addition: `  '${schemaName}'`,
    lines,
    needle: "export const LINKABLE_SCHEMAS",
    endNeedle: ");",
    adjustLine: 2,
  });

  lines = sortLines({
    lines,
    fromNeedle: "export const LINKABLE_SCHEMAS",
    toNeedle: ");",
    adjustFromLine: 1,
  });

  lines = lines.join("\n");

  if (!IS_TEST) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}

/**
 * Add the schema to the schema index file
 */

export function injectSchema(answers: AnswersType) {
  let { pascalName, lowerName, schemaName, documentId } = formatName(
    answers.name,
  );

  const filePath = path.resolve(`${__dirname}../../studio/schemas/index.ts`);
  const file = fs.readFileSync(filePath).toString();
  let lines = file.split("\n");

  const schemaImportName = `page${pascalName}`;
  const importPath = `./documents/${schemaName}`;

  // add import: place doesn't matter, prettier will take care of it
  lines = [`import ${schemaImportName} from '${importPath}';`, ...lines];
  const fromNeedle = `...[`;
  const toNeedle = `],`;

  // add to schemas list
  lines = addLine({
    addition: `    ${schemaImportName},`,
    lines,
    needle: fromNeedle,
  });
  lines = sortLines({ lines, fromNeedle, toNeedle });
  lines = lines.join("\n");

  if (!IS_TEST) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}

/**
 * Add the page to the sanity desk structure
 */

export function injectDeskStructure(answers: AnswersType) {
  let { pascalName, lowerName, schemaName, documentId } = formatName(
    answers.name,
  );

  const filePath = `${__dirname}/../studio/structure.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  let addition;
  if (answers.isSingleton) {
    addition = getStructureSingleton({
      schemaName,
      documentId,
    });
  }

  if (!answers.isSingleton) {
    addition = getStructureDocumentList({
      schemaName,
      pascalName,
    });
  }

  if (addition) {
    lines = addLine({
      addition,
      lines,
      needle: `id: "navigation",`,
      adjustLine: -2,
    });
  }

  lines = lines.join("\n");

  if (!IS_TEST) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }

  console.log(lines);
  return lines;
}

/**
 * Create the schema file
 */

export function createSchema(answers: AnswersType) {
  let { pascalName, lowerName, schemaName, documentId } = formatName(
    answers.name,
  );
  const schemaFilePath = `${__dirname}/../studio/schemas/documents/${schemaName}.tsx`;

  const schemaContent = schemaName;

  if (!IS_TEST) {
    fs.writeFileSync(schemaFilePath, schemaContent);
    prettierFile(schemaFilePath);
  }
}

init();
