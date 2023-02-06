/**
 * 
 * This script generates a new module based on user input.

 * › create modules/[name]/Module.tsx
 * › create modules/[name]/Module.stories.tsx
 * › create modules/[name]/Module.schema.tsx
 * › create modules/[name]/Module.options.tsx
 *
 * › add import in schema
 * › add schema in list of schemas
 *
 * › add query in queries/page.query.ts
 * › add render action in layout/modulebuilder/ModuleBuilder.tsx
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
const { MultiSelect, Input, Confirm } = require("enquirer");

async function init() {
  try {
    const nameInput = new Input({
      type: "input",
      name: "name",
      message: `\n\n${cyan(
        "What is the name of the module?",
      )}\nHuman readable form. 'My Module' will become schema name 'module.mymodule'.\n`,
    });

    const descriptionInput = new Input({
      type: "input",
      name: "description",
      message: `\n\n${cyan(
        "Provide a short description of the module",
      )}\nUsed for the module select search. This makes it easier for editors to find modules.\n`,
    });

    const heroInput = new Confirm({
      type: "input",
      name: "isHero",
      message: `\n\n${cyan("Is this the page hero?")}\n`,
    });

    const fieldsInput = new MultiSelect({
      name: "value",
      message: "\n\nDo you want to set up basic fields?",
      limit: 7,
      initial: ["title", "intro", "image"],
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
    const isHero = await heroInput.run();
    const description = await descriptionInput.run();
    const fields = await fieldsInput.run();

    const pascalName = `${pascalCase(name)}`;
    const lowerName = name.toLowerCase();
    const schemaName = `${isHero ? "hero" : "module"}.${name
      .toLowerCase()
      .replace(/\s/g, "")}`;

    createModule(
      lowerName,
      pascalName,
      schemaName,
      fields,
      description,
      isHero,
    );

    createQuery(name, pascalName, schemaName, fields, isHero);
    createType(schemaName, { module: !isHero, hero: isHero });
    createBuilder(lowerName, pascalName, schemaName, fields, isHero);

    console.log("\nNext steps: ");

    console.log(
      `› Create an icon for the desk structure in ${cyan(
        path.relative(
          process.cwd(),
          `${__dirname}/../../studio/utils/desk/DocumentIcon.tsx`,
        ),
      )} or use an existing icon ${cyan("http://localhost:3333/cms/engine")}`,
    );
  } catch (err) {
    console.log(err);
  }
}

/**
 * a. create modules/[pascalName]/Module.tsx
 * b. create modules/[pascalName]/Module.stories.tsx
 */

function createModule(
  lowerName,
  pascalName,
  schemaName,
  fields,
  description = "",
  isHero = false,
) {
  const fileDir = isHero
    ? `${__dirname}/../../heroes`
    : `${__dirname}/../../modules`;
  const filePath = `${fileDir}/${lowerName}/${pascalName}.tsx`;
  const storiesFilePath = filePath
    .replace(".tsx", ".stories.tsx")
    .toLowerCase();
  const optionsFilePath = filePath.replace(".tsx", ".options.ts").toLowerCase();
  const testFilePath = filePath.replace(".tsx", ".test.tsx").toLowerCase();
  const queryFilePath = filePath.replace(".tsx", ".query.ts").toLowerCase();
  const schemaFilePath = filePath.replace(".tsx", ".schema.tsx").toLowerCase();
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // createSchema(lowerName, pascalName, schemaName, {
  //   replacer: "MyModule",
  //   schemaFilePath,
  //   prototypeFile: `${__dirname}/MyModule.schema.tsx`,
  //   schemaImportPrefix: isHero ? "hero" : "module",
  //   fields,
  //   description,
  // });

  const importLines: string[] = [];
  const typescriptLines: string[] = [];
  const jsxLines: string[] = [];
  const propsLines: string[] = [];
  const testsLines: string[] = [];
  const schemaLines: string[] = [];

  const queryImportLines: string[] = [];
  const queryFieldLines: string[] = [];

  if (fields.indexOf("title") > -1) {
    typescriptLines.push("eyebrow?: string;");
    typescriptLines.push("title?: string;");
    propsLines.push("eyebrow");
    propsLines.push("title");
    importLines.push(`
    import { TitleProps } from "../../components/module/Title";
    const Title = lazy<ComponentType<TitleProps>>(
      () => import(/* webpackChunkName: "Title" */ '../../components/module/Title') 
    );`);
    jsxLines.push(`
      {title && (
        <div className="mb-4 md:mb-6">
          <Title size={theme?.title?.size || 'lg'} as={theme?.title?.level} color={theme?.title?.color} eyebrow={eyebrow}>{title}</Title>
        </div>
      )}
      `);
    testsLines.push(`
      it('renders title', async () => {
        await act(() => {
          render(<MyModule title="Hello" />);
        });
        expect(screen.getByText('Hello', { selector: 'h2' })).toBeInTheDocument();
      });
      `);
    queryFieldLines.push(`title`);
    queryFieldLines.push(`eyebrow`);
    schemaLines.push(`
      defineField({
        name: 'eyebrow',
        title: 'Eyebrow',
        type: 'string',
        group: 'content',
      })`);

    schemaLines.push(`
      defineField({
        name: 'title',
        title: 'Title',
        type: 'text',
        rows: 2,
        group: 'content',
      })`);
  }

  if (fields.indexOf("intro") > -1) {
    typescriptLines.push("intro?: React.ReactNode;");
    propsLines.push("intro");
    importLines.push(`
    import { TextProps } from "../../components/module/Text";
    const Text = lazy<ComponentType<TextProps>>(
      () => import(/* webpackChunkName: "Text" */ '../../components/module/Text') 
    );`);
    importLines.push(
      `import PortableText from "../../components/portabletext/PortableText";`,
    );
    jsxLines.push(`
      {intro && (
        <div className="mb-10 md:mb-14">
          <Text color={theme?.text?.color}>
            <PortableText content={intro as any} />
          </Text>
        </div>
      )}
      `);
    testsLines.push(`
      it('renders intro', async () => {
        await act(() => {
          render(<MyModule intro={<p>Hello</p>} />);
        });
        expect(screen.getByText('Hello', { selector: 'p' })).toBeInTheDocument();
      });
      `);

    queryFieldLines.push(`intro[] \${richTextQuery}`);
    queryImportLines.push(
      `import { richTextQuery } from "../../components/portabletext/portabletext.query";`,
    );
    schemaLines.push(`
      defineField({
        name: 'intro',
        title: 'Intro',
        type: 'portabletext.simple',
        group: 'content',
      })`);
  }

  if (fields.indexOf("image") > -1) {
    typescriptLines.push("image?: ImageType");
    propsLines.push("image");
    importLines.push(`
      import { ImageType } from '../../types';
      import { ResponsiveImageProps } from '../../components/images/ResponsiveImage';
      const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
        () =>
          import(
            /* webpackChunkName: "ResponsiveImageProps" */ "../../components/images/ResponsiveImage"
          ),
      );
      `);
    jsxLines.push(`
      {image && (
        <div className="w-96 relative aspect-video">
          <ResponsiveImage {...image} fill className="absolute inset-0" />
        </div>
      )}
      `);
    testsLines.push(`
      it('renders image', async () => {
        await act(() => {
          render(<MyModule image={{
            height: 2400,
            src: 'https://cdn.sanity.io/images/h6z8r05l/development/1b2721e94193ac7e282d9b9ddda8a8b653546c53-2400x1600.jpg',
            width: 1600,
            alt: 'hello'}} />);
        });
        expect(screen.getAllByAltText('hello'));
      });
      `);

    queryFieldLines.push(`"image": \${imageQuery}`);
    queryImportLines.push(
      `import { imageQuery } from "../../components/images/image.query";`,
    );
    schemaLines.push(`
      defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        group: 'content',
      })`);
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
      it('renders items', async () => {
        await act(() => {
          render(<MyModule items={[{ title: 'hello', _key: 'x' }]} />);
        });
        expect(screen.getByText('hello')).toBeInTheDocument();
      });
      `);

    queryFieldLines.push(`items`);

    schemaLines.push(`
      defineField({
        name: 'items',
        title: 'Items',
        group: 'content',
        type: 'array',
        of: [
          defineField({
            title: 'Item',
            name: 'item',
            type: 'object',
            fields: [
              defineField({
                name: 'title',
                title: 'Title',
                type: 'string',
              })
            ],
          }),
        ],
      })`);

    if (fields.indexOf("buttons") > -1) {
      typescriptLines.push("buttons?: ButtonProps[];");
      propsLines.push("buttons");
      importLines.push(`
      import { ButtonProps } from '../../components/buttons/Button';
      
      const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
        () => import(/* webpackChunkName: "ButtonGroup" */ "../../components/module/ButtonGroup"),
      );
      `);
      jsxLines.push(`
      {buttons && (
        <div className="mt-8 lg:mt-12">
          <ButtonGroup items={buttons} />
        </div>
      )}
      `);
      testsLines.push(`
      it('renders button', async () => {
        await act(() => {
          render(<MyModule buttons={[{ label: 'hello' }]} />);
        });
        expect(screen.getByText('hello')).toBeInTheDocument();
      });
      `);

      queryFieldLines.push(`buttons[] \${buttonQuery}`);
      queryImportLines.push(
        `import { buttonQuery } from "../../components/buttons/button.query";`,
      );

      schemaLines.push(`
    defineField({
       name: 'buttons',
       title: 'Buttons',
       type: 'buttongroup',
       group: 'content',
     })`);
    }
  }

  // create module file
  const moduleContent = fs
    .readFileSync(`${__dirname}/MyModule.tsx`)
    .toString()
    .replace(/mymodule/g, lowerName)
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
    .replace(/mymodule/g, lowerName)
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(storiesFilePath, storyContent);
  prettierFile(storiesFilePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), storiesFilePath))}`,
  );

  // create options file
  const optionsContent = fs
    .readFileSync(`${__dirname}/MyModule.options.ts`)
    .toString()
    .replace(/mymodule/g, lowerName)
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(optionsFilePath, optionsContent);
  prettierFile(optionsFilePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), optionsFilePath))}`,
  );

  if (!testsLines.length) {
    testsLines.push(`throw new Error('Implement tests for MyModule');`);
  }

  // create test file
  const testContent = fs
    .readFileSync(`${__dirname}/MyModule.test.tsx`)
    .toString()
    .replace("/*TESTS*/", testsLines.join("\n\n"))
    .replace(/mymodule/g, lowerName)
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(testFilePath, testContent);
  prettierFile(testFilePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), testFilePath))}`,
  );

  // create query file
  const queryContent = fs
    .readFileSync(`${__dirname}/MyModule.query.ts`)
    .toString()
    .replace("/*IMPORT*/", queryImportLines.join("\n"))
    .replace("/*FIELDS*/", queryFieldLines.join(",\n  "))
    .replace(/MyModuleSchema/g, schemaName)
    .replace(/mymodule/g, lowerName)
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(queryFilePath, queryContent);
  prettierFile(queryFilePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), queryFilePath))}`,
  );

  // create schema file
  const schemaContent = fs
    .readFileSync(`${__dirname}/MyModule.schema.tsx`)
    .toString()
    .replace("/*DESCRIPTION*/", description)
    .replace("/*FIELDS*/", queryFieldLines.join(",\n  "))
    .replace(/MyModuleSchema/g, schemaName)
    .replace(/mymodule/g, lowerName)
    .replace(/MyModule/g, pascalName);
  fs.writeFileSync(schemaFilePath, schemaContent);
  prettierFile(schemaFilePath);

  console.log(
    `› Created file ${cyan(path.relative(process.cwd(), schemaFilePath))}`,
  );
}

/**
 * Add query
 */

function createQuery(name, pascalName, schemaName, fields, isHero) {
  const filePath = `${__dirname}/../../queries/page.query.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  lines.push(
    `import { get${pascalName}Query } from "../${
      isHero ? "heroes" : "modules"
    }/${pascalName}/${pascalName}.query";`,
  );
  lines = addLine(
    `    \${get${pascalName}Query(language)},`,
    lines,
    isHero ? '"modules":' : '"dialogs":',
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
 * Add module to the module builder
 */

function createBuilder(lowerName, pascalName, schemaName, fields, isHero) {
  const filePath = `${__dirname}/../../layout/modulebuilder/${
    isHero ? "HeroBuilder" : "ModuleBuilder"
  }.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  // add import
  lines = [
    `import { ${pascalName}Props } from '../../${
      isHero ? "heroes" : "modules"
    }/${lowerName}/${pascalName}'`,
    `
      const ${pascalName} = lazy<ComponentType<${pascalName}Props>>(
        () =>
          import(
            /* webpackChunkName: "${pascalName}" */ '../../${
      isHero ? "heroes" : "modules"
    }/${lowerName}/${pascalName}'
          )
      );
      `,
    ...lines,
  ];

  // add to render loop
  const jsx = isHero
    ? `{hero._type === '${schemaName}' && <${pascalName} {...(hero as ${pascalName}Props)} />}`
    : `{item._type === '${schemaName}' && <${pascalName} {...(item as ${pascalName}Props)} />}`;
  lines = addLine(jsx, lines, isHero ? "</section>" : "</LazyLoadInView>", 0);

  fs.writeFileSync(filePath, lines.join("\n"));
  prettierFile(filePath);

  console.log(
    `› Added import to ${cyan(path.relative(process.cwd(), filePath))}`,
  );
  console.log(
    `› Added module render to ${cyan(path.relative(process.cwd(), filePath))}`,
  );
}

init();
