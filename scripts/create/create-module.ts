/**
 * 
 * This script generates a new module based on user input.

 * › create modules/[pascalName]/Module.tsx
 * › create modules/[pascalName]/Module.stories.tsx
 *
 * › create studio/modules/module.[schemaname].tsx
 * › add import in schema
 * › add schema in list of schemas
 *
 * › add query in queries/page.ts
 * › add render action in layout/ModuleBuilder/ModuleBuilder.tsx
 * 
 * › add schema to all schemas type types.sanity.ts
 * › add schema to module type types.sanity.ts
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
const { MultiSelect, Input } = require("enquirer");

async function init() {
  try {
    const nameInput = new Input({
      type: "input",
      name: "name",
      message: `${cyan(
        "What is the name of the module?"
      )}\nHuman readable form. 'My Module' will become schema name 'module.mymodule'.\n`,
    });

    const descriptionInput = new Input({
      type: "input",
      name: "description",
      message: `${cyan(
        "Provide a short description of the module"
      )}\nUsed for the module select search. This makes it easier for editors to find modules.\n`,
    });

    const fieldsInput = new MultiSelect({
      name: "value",
      message: "Do you want to set up basic fields?",
      limit: 7,
      choices: [
        { name: "title", value: "Title" },
        { name: "intro", value: "Intro" },
        { name: "image", value: "Image" },
        { name: "buttons", value: "Buttons" },
        { name: "items", value: "Items" },
      ],
    });

    const name = await nameInput.run();
    if (!name) return;
    const description = await descriptionInput.run();
    const fields = await fieldsInput.run();

    const pascalName = `${pascalCase(name)}`;
    const schemaName = `module.${name.toLowerCase().replace(/\s/g, "")}`;

    createModule(pascalName, fields);

    createSchema(name, pascalName, schemaName, {
      replacer: "MyModule",
      schemaDir: "modules",
      prototypeFile: `${__dirname}/module.mymodule.tsx`,
      schemaImportPrefix: "module",
      fields,
      description,
    });

    createQuery(name, schemaName, fields);
    createType(schemaName, { module: true });
    createBuilder(name, pascalName, schemaName, fields);

    console.log("\nNext steps: ");

    console.log(
      `› Create an icon for the desk structure in ${cyan(
        path.relative(
          process.cwd(),
          `${__dirname}/../../studio/utils/desk/DocumentIcon.tsx`
        )
      )} or use an existing icon ${cyan("http://localhost:3333/cms/engine")}`
    );
  } catch (err) {
    console.log(err);
  }
}

/**
 * a. create modules/[pascalName]/Module.tsx
 * b. create modules/[pascalName]/Module.stories.tsx
 */

function createModule(pascalName, fields, description = "") {
  const fileDir = `${__dirname}/../../modules`;
  const filePath = `${fileDir}/${pascalName}/${pascalName}.tsx`;
  const storiesFilePath = filePath.replace(".tsx", ".stories.tsx");
  const optionsFilePath = filePath.replace(".tsx", "Options.ts");
  const testFilePath = filePath.replace(".tsx", ".test.tsx");
  const queryFilePath = filePath.replace(".tsx", ".query.ts");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const importLines = [];
  const typescriptLines = [];
  const jsxLines = [];
  const propsLines = [];
  const testsLines = [];

  const queryImportLines = [];
  const queryFieldLines = [];

  if (fields.indexOf("title") > -1) {
    typescriptLines.push("eyebrow?: string;");
    typescriptLines.push("title?: string;");
    propsLines.push("eyebrow");
    propsLines.push("title");
    importLines.push(`import { Title } from '../../components/module/Title';`);
    jsxLines.push(`
      {title && (
        <div className="mb-4 md:mb-6">
          <Title size="lg" eyebrow={eyebrow}>{title}</Title>
        </div>
      )}
      `);
    testsLines.push(`
      it('renders title', () => {
        render(<MyModule title="Hello" />);
        expect(screen.getByText('Hello', { selector: 'h2' })).toBeInTheDocument();
      });
      `);
    queryFieldLines.push(`title`);
    queryFieldLines.push(`eyebrow`);
  }

  if (fields.indexOf("intro") > -1) {
    typescriptLines.push("intro?: React.ReactNode;");
    propsLines.push("intro");
    importLines.push(`import { Text } from '../../components/module/Text';`);
    importLines.push(
      `import PortableText from "../../components/content/PortableText";`
    );
    jsxLines.push(`
      {intro && (
        <div className="mb-10 md:mb-14">
          <Text color={theme?.text}>
            <PortableText content={intro as any} />
          </Text>
        </div>
      )}
      `);
    testsLines.push(`
      it('renders intro', () => {
        render(<MyModule intro={<p>Hello</p>} />);
        expect(screen.getByText('Hello', { selector: 'p' })).toBeInTheDocument();
      });
      `);

    queryFieldLines.push(`intro[] \${richTextQuery}`);
    queryImportLines.push(
      `import { richTextQuery } from "../../queries/components/richText";`
    );
  }

  if (fields.indexOf("image") > -1) {
    typescriptLines.push("image?: ImageType");
    propsLines.push("image");
    importLines.push(`
      import { ImageType } from '../../types';
      import { ResponsiveImage } from '../../components/images/ResponsiveImage';`);
    jsxLines.push(`
      {image && (
        <div className="w-96 h-96">
          <ResponsiveImage {...image} layout="fill" />
        </div>
      )}
      `);
    testsLines.push(`
      it('renders image', () => {
        render(<MyModule image={{
          height: 2400,
          src: 'https://cdn.sanity.io/images/h6z8r05l/development/1b2721e94193ac7e282d9b9ddda8a8b653546c53-2400x1600.jpg',
          width: 1600,
          alt: 'hello'}} />);
        expect(screen.getAllByAltText('hello'));
      });
      `);

    queryFieldLines.push(`"image": \${imageQuery}`);
    queryImportLines.push(
      `import { imageQuery } from "../../queries/components/image";`
    );
  }

  if (fields.indexOf("items") > -1) {
    typescriptLines.push("items?: { _key?:string;title?:string }[];");
    propsLines.push("items");
    jsxLines.push(`
      {Boolean(items?.length) && (
        <ul className="pt-7 divide-y divide-grey-50">
          {items?.map(({ title, _key }) => (
            <li key={_key} className="">{title}</li>
          ))}
        </ul>
      )}
      `);
    testsLines.push(`
      it('renders items', () => {
        render(<MyModule items={[{ title: 'hello', _key: 'x' }]} />);
        expect(screen.getByText('hello')).toBeInTheDocument();
      });
      `);

    queryFieldLines.push(`items`);
  }

  if (fields.indexOf("buttons") > -1) {
    typescriptLines.push("buttons?: ButtonProps[];");
    propsLines.push("buttons");
    importLines.push(`
        import { ButtonProps } from '../../components/buttons/Button';
        import { ButtonGroup } from '../../components/buttons/ButtonGroup';`);
    jsxLines.push(`
      {buttons && (
        <div className="mt-8 lg:mt-12">
          <ButtonGroup items={buttons} />
        </div>
      )}
      `);
    testsLines.push(`
      it('renders button', () => {
        render(<MyModule buttons={[{ label: 'hello' }]} />);
        expect(screen.getByText('hello')).toBeInTheDocument();
      });
      `);

    queryFieldLines.push(`buttons[] \${buttonQuery}`);
    queryImportLines.push(
      `import { buttonQuery } from "../../queries/components/button";`
    );
  }

  // create module file
  const moduleContent = fs
    .readFileSync(`${__dirname}/MyModule.tsx`)
    .toString()
    .replace(/MyModule/g, pascalName)
    .replace("/*TYPE*/", `${typescriptLines.join("\n")}`)
    .replace("/*IMPORT*/", `${importLines.join("\n")}`)
    .replace("/*JSX*/", `${jsxLines.join("\n")}`)
    .replace("/*PROPS*/", `, ${propsLines.join(",")}`);
  fs.writeFileSync(filePath, moduleContent);
  prettierFile(filePath);

  console.log(`› Created file ${cyan(path.relative(process.cwd(), filePath))}`);

  // create stories file
  const storyContent = fs
    .readFileSync(`${__dirname}/MyModule.stories.tsx`)
    .toString()
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(storiesFilePath, storyContent);
  prettierFile(storiesFilePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), storiesFilePath))}`
  );

  // create options file
  const optionsContent = fs
    .readFileSync(`${__dirname}/MyModuleOptions.ts`)
    .toString()
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(optionsFilePath, optionsContent);
  prettierFile(optionsFilePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), optionsFilePath))}`
  );

  if (!testsLines.length) {
    testsLines.push(`throw new Error('Implement tests for MyModule');`);
  }

  // create test file
  const testContent = fs
    .readFileSync(`${__dirname}/MyModule.test.tsx`)
    .toString()
    .replace("/*TESTS*/", testsLines.join("\n\n"))
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(testFilePath, testContent);
  prettierFile(testFilePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), testFilePath))}`
  );

  // create query file
  const queryContent = fs
    .readFileSync(`${__dirname}/MyModule.query.ts`)
    .toString()
    .replace("/*IMPORT*/", queryImportLines.join("\n"))
    .replace("/*FIELDS*/", queryFieldLines.join(",\n  "))
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(queryFilePath, queryContent);
  prettierFile(queryFilePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), queryFilePath))}`
  );
}

/**
 * Add query
 */

function createQuery(name, schemaName, fields) {
  const filePath = `${__dirname}/../../queries/page.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  lines = addLine(`\${get${name}Query(language)}`, lines, '"dialogs":', -3);
  lines.push(
    `import { get${name}Query } from "../modules/${name}/${name}.query";`
  );
  fs.writeFileSync(filePath, lines.join("\n"));
  console.log(
    `› Added query in ${cyan(path.relative(process.cwd(), filePath))}`
  );
  prettierFile(filePath);

  console.log(`› Created file ${cyan(path.relative(process.cwd(), filePath))}`);
}

/**
 * Add module to the module builder
 */

function createBuilder(name, pascalName, schemaName, fields) {
  const filePath = `${__dirname}/../../layout/ModuleBuilder/ModuleBuilder.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  // add import
  lines = [
    `
      const ${pascalName} = dynamic<GenericModuleProps>(
        () =>
          import(
            /* webpackChunkName: "${pascalName}" */ '../../modules/${pascalName}/${pascalName}'
          ) as any,
        { suspense: true },
      );
      `,
    ...lines,
  ];

  // add to render loop
  const jsx = `{item._type === '${schemaName}' && <${pascalName} {...item} />}`;
  lines = addLine(jsx, lines, "</LazyLoadInView>", 0);

  fs.writeFileSync(filePath, lines.join("\n"));
  prettierFile(filePath);

  console.log(
    `› Added import to ${cyan(path.relative(process.cwd(), filePath))}`
  );
  console.log(
    `› Added module render to ${cyan(path.relative(process.cwd(), filePath))}`
  );
}

init();
