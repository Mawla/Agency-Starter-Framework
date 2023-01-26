/**
 * 
 * This script generates a new hero based on user input.
 * 
 * › create heroes/[pascalName].tsx
 * › create heroes/[pascalName].stories.tsx
 *
 * › create studio/modules/hero.[schemaname].tsx
 * › add import in schema
 * › add schema in list of schemas
 *
 * › add query in queries/page.ts
 * › add render action in layout/ModuleBuilder/HeroBuilder.tsx
 * 
 * › add schema to all schemas type types.sanity.ts
 * › add schema to hero type types.sanity.ts

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

const ask = `What is the name of the hero? `;
const description = `Human readable form. 'My Hero' will become schema name 'hero.myhero'.`;

const answers: { name?: string; schemaName?: string; pascalName?: string } = {};

readline.question(question(ask, description), (name) => {
  if (!name.trim().length) return readline.close();

  answers.name = name;
  answers.pascalName = `${pascalCase(name)}`;
  answers.schemaName = `hero.${name.toLowerCase().replace(/\s/g, "")}`;

  console.log("");

  build();

  readline.close();
});

function build() {
  const { name, pascalName, schemaName } = answers;

  createHero();

  createSchema(name, pascalName, schemaName, {
    replacer: "MyHero",
    schemaDir: "modules",
    prototypeFile: `${__dirname}/hero.myhero.tsx`,
    schemaImportPrefix: "hero",
    fields: ["title", "image"],
  });

  createQuery();
  createType(schemaName, { hero: true });
  createBuilder();
}

/**
 * a. create heroes]/[pascalName].tsx
 * b. create heroes/[pascalName].stories.tsx
 * c. create heroes/[pascalName]Options.ts
 */

function createHero() {
  const { pascalName } = answers;

  const fileDir = `${__dirname}/../../heroes`;
  const filePath = `${fileDir}/${pascalName}.tsx`;
  const storiesFilePath = filePath.replace(".tsx", ".stories.tsx");
  const optionsFilePath = filePath.replace(".tsx", "Options.ts");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // create hero file
  const heroContent = fs
    .readFileSync(`${__dirname}/MyModule.tsx`)
    .toString()
    .replace(/MyModule/g, pascalName)
    .replace(/\.\.\/\.\.\//g, "../")
    .replace("../modules/", "heroes/")
    .replace(
      "/*IMPORT*/",
      `
      import { ImageType } from '../types';
      import { Title } from '../components/module/Title';
      import { ResponsiveImage } from '../components/images/ResponsiveImage';`
    )
    .replace("/*TYPE*/", "title?: string; image?: ImageType")
    .replace("/*PROPS*/", ", title, image")
    .replace(
      "/*JSX*/",
      `
      <Title as="h1">{title}</Title>
      <ResponsiveImage {...image} priority />`
    );
  fs.writeFileSync(filePath, heroContent);
  prettierFile(filePath);

  console.log(`› Created file ${cyan(path.relative(process.cwd(), filePath))}`);

  // create stories file
  const storyContent = fs
    .readFileSync(`${__dirname}/MyModule.stories.tsx`)
    .toString()
    .replace(/MyModule/g, pascalName)
    .replace(/\.\.\/\.\.\//g, "../")
    .replace("Modules/", "Hero/");
  fs.writeFileSync(storiesFilePath, storyContent);
  prettierFile(storiesFilePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), storiesFilePath))}`
  );
  // create options file
  const optionsContent = fs
    .readFileSync(`${__dirname}/MyModuleOptions.ts`)
    .toString()
    .replace("../../", "../")
    .replace("../../types", "../types")
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(optionsFilePath, optionsContent);
  prettierFile(filePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), optionsFilePath))}`
  );
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
      title,
      "image": \${imageQuery},
    },
    `;

  lines = addLine(newQuery, lines, '"modules":', -3);
  fs.writeFileSync(filePath, lines.join("\n"));
  console.log(
    `› Added query in ${cyan(path.relative(process.cwd(), filePath))}`
  );
}

/**
 * Add hero to the hero builder
 */

function createBuilder() {
  const { name, pascalName, schemaName } = answers;

  const filePath = `${__dirname}/../../layout/ModuleBuilder/HeroBuilder.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  // add import
  lines = [
    `
    import { ${pascalName}Props } from '../../heroes/${pascalName}';
    const ${pascalName} = dynamic<${pascalName}Props>(
      () =>
        import(
          /* webpackChunkName: "${pascalName}" */ '../../heroes/${pascalName}'
        ) as any,
      { suspense: true },
    );
    `,
    ...lines,
  ];

  // add to render loop
  const jsx = `\n{/* ${name} */}{hero._type === '${schemaName}' && <${pascalName} {...hero} />}`;
  lines = addLine(jsx, lines, "</Suspense>", 0);

  fs.writeFileSync(filePath, lines.join("\n"));
  prettierFile(filePath);

  console.log(
    `› Added import to ${cyan(path.relative(process.cwd(), filePath))}`
  );
  console.log(
    `› Added hero render to ${cyan(path.relative(process.cwd(), filePath))}`
  );
}
