import { addLine } from "./utils/add-line";
import { pascalCase } from "./utils/pascal-case";
import { prettierFile } from "./utils/prettier-file";
import { sortLines } from "./utils/sort-lines";
import { text, intro, outro, confirm } from "@clack/prompts";

const fs = require("fs");
const path = require("path");

type NamesType = {
  pascalName: string;
  lowerName: string;
  schemaName: string;
  documentId: string;
};

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

  let hasChildren;
  if (isSingleton) {
    hasChildren = await confirm({
      message: "Does it have children?",
    });
  }

  let childName;
  if (hasChildren) {
    childName = await text({
      message: `What is the name of the page? (e.g. "Blog")`,
      validate(value) {
        if (!value || value.trim().length === 0) return `Value is required!`;
      },
    });
  }

  let addToDesk = await confirm({
    message: "Do you want to add it to the studio desk structure?",
  });

  name = String(name);
  let pascalName = `${pascalCase(name)}`;
  let lowerName = name.toLowerCase();
  let schemaName = `page.${name.toLowerCase().replace(/\s/g, "")}`;
  let documentId = schemaName.replace("page.", "page_");

  const answers = {
    name: String(name),
    isSingleton: Boolean(isSingleton),
    hasChildren: Boolean(hasChildren),
    childName: String(childName),
    addToDesk: Boolean(addToDesk),
  };

  const names: NamesType = {
    pascalName,
    lowerName,
    schemaName,
    documentId,
  };

  injectTypes(answers, names);

  outro(`You're all set!`);
}

function injectTypes(answers: AnswersType, names: NamesType) {
  const { schemaName } = names;

  const filePath = `${__dirname}/../../types.sanity.ts`;
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

  fs.writeFileSync(filePath, lines.join("\n"));
  prettierFile(filePath);
}

init();
