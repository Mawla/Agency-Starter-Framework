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
  const { pascalName, schemaName, name } = answers;

  const fileDir = `${__dirname}/../../heroes`;
  const filePath = `${fileDir}/${pascalName}/${pascalName}.tsx`;
  const storiesFilePath = filePath.replace(".tsx", ".stories.tsx");
  const optionsFilePath = filePath.replace(".tsx", "Options.ts");
  const queryFilePath = filePath.replace(".tsx", ".query.ts");
  const schemaFilePath = filePath.replace(".tsx", ".schema.tsx");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  createSchema(pascalName, schemaName, {
    replacer: "MyHero",
    schemaFilePath,
    prototypeFile: `${__dirname}/MyHero.schema.tsx`,
    schemaImportPrefix: "hero",
    fields: ["title", "image"],
  });

  // create hero file
  const heroContent = fs
    .readFileSync(`${__dirname}/MyModule.tsx`)
    .toString()
    .replace(/MyModule/g, pascalName)
    .replace(
      "/*IMPORT*/",
      `
      import { TextProps } from '../../components/module/Text';
      import { TitleProps } from '../../components/module/Title';
      import { ImageType } from '../../types';
      const Title = lazy<ComponentType<TitleProps>>(
        () => import(/* webpackChunkName: "Title" */ '../../components/module/Title') 
      );
      const Text = lazy<ComponentType<TextProps>>(
        () => import(/* webpackChunkName: "Text" */ '../../components/module/Text') 
      );
      import { ResponsiveImageProps } from '../../components/images/ResponsiveImage';
      const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
        () => import(/* webpackChunkName: "Text" */ '../../components/images/ResponsiveImage') 
      );
      
      `,
    )
    .replace("/*TYPE*/", "title?: string; image?: ImageType")
    .replace("/*PROPS*/", ", title, image")
    .replace(
      "/*JSX*/",
      `
      <Title as="h1">{title}</Title>
      <ResponsiveImage {...image} priority roundSize={50} loading="eager" />`,
    );
  fs.writeFileSync(filePath, heroContent);
  prettierFile(filePath);

  console.log(`› Created file ${cyan(path.relative(process.cwd(), filePath))}`);

  // create stories file
  const storyContent = fs
    .readFileSync(`${__dirname}/MyModule.stories.tsx`)
    .toString()
    .replace(/MyModule/g, pascalName)
    .replace("Modules/", "Hero/");
  fs.writeFileSync(storiesFilePath, storyContent);
  prettierFile(storiesFilePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), storiesFilePath))}`,
  );
  // create options file
  const optionsContent = fs
    .readFileSync(`${__dirname}/MyModuleOptions.ts`)
    .toString()
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(optionsFilePath, optionsContent);
  prettierFile(filePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), optionsFilePath))}`,
  );

  // create query file
  const queryContent = fs
    .readFileSync(`${__dirname}/MyModule.query.ts`)
    .toString()
    .replace(
      "/*IMPORT*/",
      `import { imageQuery } from "../../queries/components/image";`,
    )
    .replace(
      "/*FIELDS*/",
      `title,
  "image": \${imageQuery},`,
    )
    .replace(/MyModuleSchema/g, schemaName)
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(queryFilePath, queryContent);
  prettierFile(queryFilePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), queryFilePath))}`,
  );
}

/**
 * Add query
 */

function createQuery() {
  const { pascalName } = answers;
  const filePath = `${__dirname}/../../queries/page.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  lines.push(
    `import { get${pascalName}Query } from "../heroes/${pascalName}/${pascalName}.query";`,
  );
  lines = addLine(
    `    \${get${pascalName}Query(language)},`,
    lines,
    '"modules":',
    -3,
  );

  fs.writeFileSync(filePath, lines.join("\n"));
  console.log(
    `› Added query in ${cyan(path.relative(process.cwd(), filePath))}`,
  );
  prettierFile(filePath);

  console.log(`› Created file ${cyan(path.relative(process.cwd(), filePath))}`);
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
    const ${pascalName} = lazy<ComponentType<${pascalName}Props>>(
      () =>
        import(
          /* webpackChunkName: "${pascalName}" */ '../../heroes/${pascalName}/${pascalName}'
        ),
    );
    `,
    ...lines,
  ];

  // add to render loop
  const jsx = `{hero._type === '${schemaName}' && <${pascalName} {...hero} />}`;
  lines = addLine(jsx, lines, "</Suspense>", 0);

  fs.writeFileSync(filePath, lines.join("\n"));
  prettierFile(filePath);

  console.log(
    `› Added import to ${cyan(path.relative(process.cwd(), filePath))}`,
  );
  console.log(
    `› Added hero render to ${cyan(path.relative(process.cwd(), filePath))}`,
  );
}
