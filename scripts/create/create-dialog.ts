/**
 * 
 * This script generates a new dialog based on user input.
 *
 * › create studio/modules/dialog.[schemaname].tsx
 * › add import in schema
 * › add schema in list of schemas
 *
 * › add query in queries/page.ts
 * › add render action in layout/ModuleBuilder/DialogBuilder.tsx
 * 
 * › add schema to all schemas type types.sanity.ts
 * › add schema to dialog type types.sanity.ts

 */

const fs = require("fs");
const path = require("path");
const { pascalCase } = require("../helpers/pascalCase");
const { prettierFile } = require("../helpers/prettierFile");
const { addLine } = require("../helpers/addLine");
const { createSchema } = require("../helpers/createSchema");
const { createType } = require("../helpers/createType");
const { question } = require("../helpers/question");
const { cyan } = require("../helpers/terminal");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = `What is the name of the dialog? `;
const description = `Human readable form. 'My Dialog' will become schema name 'dialog.mydialog'.`;

const answers: { name?: string; schemaName?: string; pascalName?: string } = {};

readline.question(question(ask, description), (name) => {
  if (!name.trim().length) return readline.close();

  answers.name = name;
  answers.pascalName = `${pascalCase(name)}`;
  answers.schemaName = `dialog.${name.toLowerCase().replace(/\s/g, "")}`;

  console.log("");

  build();

  readline.close();
});

function build() {
  const { name, pascalName, schemaName } = answers;

  createSchema(pascalName, schemaName, {
    replacer: "MyDialog",
    prototypeFile: `${__dirname}/dialog.mydialog.tsx`,
    schemaImportPrefix: "dialog",
  });

  createQuery();
  createType(schemaName, { dialog: true });
  createBuilder();
}

/**
 * Add query
 */

function createQuery() {
  const { name, schemaName } = answers;
  const filePath = `${__dirname}/../../queries/page.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  const newQuery = `
    // ${name}
    _type == "${schemaName}" => {
      title
    },
    `;

  lines = addLine(newQuery, lines, '"dialogs":', 4);
  fs.writeFileSync(filePath, lines.join("\n"));
  console.log(
    `› Added query in ${cyan(path.relative(process.cwd(), filePath))}`,
  );
}

/**
 * Add dialog to the dialog builder
 */

function createBuilder() {
  const { name, pascalName, schemaName } = answers;

  const filePath = `${__dirname}/../../layout/ModuleBuilder/DialogBuilder.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  // add to render loop
  const jsx = `\n{/* ${name} */}{item._type === '${schemaName}' && '${pascalName}'}`;
  lines = addLine(jsx, lines, "</Dialog>", 0);

  fs.writeFileSync(filePath, lines.join("\n"));
  prettierFile(filePath);

  console.log(
    `› Added import to ${cyan(path.relative(process.cwd(), filePath))}`,
  );
  console.log(
    `› Added dialog render to ${cyan(path.relative(process.cwd(), filePath))}`,
  );
}
