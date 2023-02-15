import { pascalCase } from "./utils/pascalCase";
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
    name,
    isSingleton,
    hasChildren,
    childName,
    addToDesk,
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
  const { pascalName, lowerName, schemaName, documentId } = names;

  const filePath = `${__dirname}/../../types.sanity.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");
}

init();
