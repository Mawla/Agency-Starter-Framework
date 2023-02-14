import { SCHEMAS } from "../../types.sanity";

/**
 *
 * This script generates a new page type based on user input
 *
 * › create studio/documents/page.[schemaname].tsx
 * › add import in schema
 * › add schema in list of schemas
 * › set singleton boolean in schema
 *
 * › add schema to all schemas type types.sanity.ts
 * › add schema to linkable schemas in types.sanity.ts
 *
 * › add to structure builder
 * › add to sitemap query
 */

const fs = require("fs");
const path = require("path");
const { pascalCase } = require("../helpers/pascalCase");
const { prettierFile } = require("../helpers/prettierFile");
const { addLine } = require("../helpers/addLine");
const { addSchema } = require("../helpers/addSchema");
const { addSchemaType } = require("../helpers/addSchemaType");
const { cyan } = require("../helpers/terminal");
const { question } = require("../helpers/question");
const { yesno } = require("../helpers/yesno");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const answers: {
  name?: string;
  singleton?: boolean;
  parentType?: string;
  parentId?: string;
  addDesk?: boolean;
} = {};

function askName() {
  const ask = `What is the name of the page?`;
  const description = `Use single form for articles and plural form for overviews. For instance 'blogs' will be the blog overview and 'blog' will be the article. `;

  readline.question(question(ask, description), (answer) => {
    if (!answer.trim().length) return readline.close();
    answers.name = answer;
    askSingleton();
  });
}

function askSingleton() {
  const ask = `Is it a single use item, like the homepage or blog overview?`;
  const description = `If so a singleton schema is created.`;
  const options = ["Y", "n"];

  readline.question(question(ask, description, options), (answer) => {
    answers.singleton = yesno(answer || "Y");
    askChildren();
  });
}

function askChildren() {
  if (answers.singleton) return askDesk();

  const ask = `If it has a parent, what is its type?`;
  const description = `Used to create a grouped desk structure.`;
  const options = Object.keys(SCHEMAS)
    .filter((type) => type.startsWith("page."))
    .map((type) => type);

  readline.question(question(ask, description, options), (answer) => {
    answers.parentType = answer;
    answers.parentId = answer.replace("page.", "page_");
    askDesk();
  });
}

function askDesk() {
  const ask = `Add to desk structure?`;
  const description = `Say no if you plan to do this manually. If the page doesn't exist in the database yet you probably want to say yes and remove it later.`;
  const options = ["Y", "n"];

  readline.question(question(ask, description, options), (answer) => {
    answers.addDesk = yesno(answer || "Y");
    finish();
  });
}

function finish() {
  readline.close();
  build(answers);

  console.log("\nNext steps: ");

  console.log(
    `› Create an icon for the desk structure from https://atlasicons.vectopus.com`,
  );

  if (answers.parentType) {
    console.log(`› Clean up the desk structure`);
    console.log(`› Check the sitemap`);
  }

  console.log(`› Check the frontend`);
}

askName();

const build = (answers) => {
  const { name, singleton, addDesk, parentType, parentId } = answers;
  if (!name.trim().length) return readline.close();

  const pascalName = `${pascalCase(name)}`;
  const lowerName = name.toLowerCase();
  const schemaName = `page.${name.toLowerCase().replace(/\s/g, "")}`;
  const documentId = schemaName.replace("page.", "page_");

  console.log("");
  addSchemaType(schemaName, { linkable: true, translatable: false });

  // create schema file
  const schemaFilePath = `${__dirname}/../../studio/schemas/documents/${schemaName}.tsx`;

  let schemaContent = fs
    .readFileSync(`${__dirname}/page.mypage.tsx`)
    .toString()
    .replace(/MyPageSchema/g, schemaName)
    .replace(/mypage/g, lowerName)
    .replace(/MyPage/g, pascalName)
    .replace(`/*OPTIONS*/`, singleton ? `options: { singleton: true },` : "")
    .replace(
      `/*PARENT_FIELD*/`,
      singleton || !parentType || !parentId || !parentType?.trim().length
        ? `PARENT_FIELD,`
        : `{
      ...PARENT_FIELD,
      to: [{ type: "${parentType}" }],
      options: { disableNew: true },
      hidden: true,
    },`,
    )
    .replace(
      `/*INITIAL_VALUE*/`,
      !parentType || !parentId || !parentType?.trim().length || singleton
        ? ""
        : `
        initialValue: async (props, context) => {
          const client = context.getClient({ apiVersion: "vX" });
          const { language } = getStructurePath();
      
          const parentDocumentId = await client.fetch(
            \`*[_id match "${parentId}__i18n_\${language}"][0]._id\`,
          );
      
          if (!parentDocumentId) return {};
      
          return {
            parent: { _type: "reference", _ref: parentDocumentId },
          };
        },
        `,
    );

  if (singleton) {
    schemaContent = schemaContent.replace(
      "...pageBase.fields,",
      `...pageBase.fields.map((field) => {
      if (field.name === "i18n_base") {
        return getI18nBaseFieldForSingleton(SCHEMA_NAME);
      }
      return { ...field };
    }),`,
    );
  }

  fs.writeFileSync(schemaFilePath, schemaContent);
  prettierFile(schemaFilePath);

  addSchema(`page${pascalName}`, `./documents/${schemaName}`);

  if (addDesk)
    createDeskStructure(name, pascalName, schemaName, documentId, answers);

  if (answers.singleton) {
    console.log(
      `› Create the page by running 'sanity documents create --id ${documentId}'`,
    );
  }

  readline.close();
};

/**
 * Add to desk
 */

function createDeskStructure(
  name,
  pascalName,
  schemaName,
  documentId,
  answers,
) {
  const { singleton, parentType, parentId } = answers;

  const filePath = `${__dirname}/../../studio/structure.tsx`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  let str;

  if (singleton) {
    str = `
      singleton(S, { 
        id: '${documentId}', 
        type: '${schemaName}',
        language: language.id, 
      }),
    `;
  } else {
    if (parentId) {
      str = `
        documentList(S, {
          type: '${schemaName}',
          title: '${pascalName}',
          language: language.id,
        }),
      `;
    } else {
      str = `
        documentList(S, { 
          type: '${schemaName}', 
          title: '${name}',
          language: language.id
        }),
      `;
    }
  }

  lines = addLine(str, lines, `type: "page.content"`, -1);

  fs.writeFileSync(filePath, lines.join("\n"));
  prettierFile(filePath);
  console.log(
    `› Added to desk structure in ${cyan(
      path.relative(process.cwd(), filePath),
    )}`,
  );
}
