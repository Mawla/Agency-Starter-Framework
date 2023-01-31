import { slugify } from "../../helpers/utils/string";
import { sortLines } from "../helpers/sortLines";

/**
 *
 * This script generates a new static form
 *
 * › add form id to types
 * › add to static form builder
 * › add component file
 * › add to static form api
 * ? add options to types
 */

const fs = require("fs");
const path = require("path");
const { pascalCase } = require("../helpers/pascalCase");
const { prettierFile } = require("../helpers/prettierFile");
const { addLine } = require("../helpers/addLine");
const { cyan } = require("../helpers/terminal");
const { question } = require("../helpers/question");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const answers: { name?: string; slug?: string; pascalName?: string } = {};

function askName() {
  const ask = `What is the name of the form?`;
  const description = `Will be slugified to make an id out of it.`;

  readline.question(question(ask, description), (answer) => {
    if (!answer.trim().length) return readline.close();
    answers.name = answer;
    answers.slug = slugify(answer);
    answers.pascalName = pascalCase(answer);
    finish();
  });
}

function finish() {
  readline.close();
  build();

  console.log("\nNext steps: ");
  console.log(`› Start building the form`);
  console.log(
    `› Add options in the cms inside ${cyan(
      path.relative(process.cwd(), `${__dirname}/../../types.ts`),
    )}`,
  );
  console.log(`› Add the form in the cms`);
}

askName();

function build() {
  const { name } = answers;
  if (!name.trim().length) return readline.close();

  addType();
  createForm();
  createBuilder();
  createApi();

  readline.close();
}

function addType() {
  const { name, slug } = answers;
  const filePath = `${__dirname}/../../types.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  const fromNeedle = "export const STATIC_FORMS";
  const toNeedle = "};";
  lines = addLine(`  '${slug}': '${name}',`, lines, fromNeedle);
  lines = sortLines(lines, fromNeedle, toNeedle);

  fs.writeFileSync(filePath, lines.join("\n"));

  console.log(
    `› Added ${slug} to static forms ${cyan(
      path.relative(process.cwd(), `${__dirname}/../../types.ts`),
    )}`,
  );
}

/**
 * Create form
 */

function createForm() {
  const { pascalName } = answers;

  const fileDir = `${__dirname}/../../forms`;
  const filePath = `${fileDir}/${pascalName}.tsx`;
  const storiesFilePath = filePath.replace(".tsx", ".stories.tsx");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // create module file
  const moduleContent = fs
    .readFileSync(`${__dirname}/MyStaticForm.tsx`)
    .toString()
    .replace(/MyStaticForm/g, pascalName);
  fs.writeFileSync(filePath, moduleContent);

  console.log(`› Created file ${cyan(path.relative(process.cwd(), filePath))}`);

  // create stories file
  const storyContent = fs
    .readFileSync(`${__dirname}/MyStaticForm.stories.tsx`)
    .toString()
    .replace(/MyStaticForm/g, pascalName);
  fs.writeFileSync(storiesFilePath, storyContent);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), storiesFilePath))}`,
  );
}

/**
 * Add module to the module builder
 */

function createBuilder() {
  const { pascalName, slug } = answers;

  const filePath = `${__dirname}/../../layout/ModuleBuilder/StaticFormBuilder.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  // add import
  lines = [
    `
    import { ${pascalName}Values, ${pascalName}Props } from '../../forms/${pascalName}';
    const ${pascalName} = lazy<ComponentType<${pascalName}Props>>(
      () =>
        import(
          /* webpackChunkName: "${pascalName}" */ '../../forms/${pascalName}'
        )
    );
    `,
    ...lines,
  ];

  // add to render loop
  const jsx = `\n{formId === '${slug}' && <${pascalName} {...formProps} />}`;
  lines = addLine(jsx, lines, "</LazyLoadInView>", 0);

  // add values type
  let doc = lines.join("\n");
  doc = doc.replace("async (values: ", `async (values: ${pascalName}Values | `);

  fs.writeFileSync(filePath, doc);
  prettierFile(filePath);

  console.log(
    `› Added import to ${cyan(path.relative(process.cwd(), filePath))}`,
  );
  console.log(
    `› Added form render to ${cyan(path.relative(process.cwd(), filePath))}`,
  );
}

/**
 * Add to form api
 */

function createApi() {
  const { name, slug } = answers;

  const filePath = `${__dirname}/../../pages/api/static-form.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  // add import
  const snippet = `
      // ${name}
      if (formId === '${slug}') {
        status = { error: '${slug} endpoint not set up yet' };
      }`;

  lines = addLine(snippet, lines, `if ('success' in status)`, -1);

  fs.writeFileSync(filePath, lines.join("\n"));
  prettierFile(filePath);

  console.log(
    `› Added api endpoint to ${cyan(path.relative(process.cwd(), filePath))}`,
  );
}
