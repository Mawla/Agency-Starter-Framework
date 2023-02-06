import { languages } from "../../languages";
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
const { createSchema } = require("../helpers/createSchema");
const { createType } = require("../helpers/createType");
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
  const options = Object.keys(SCHEMAS).map((type) => type);

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
    `› Create an icon for the desk structure in ${cyan(
      path.relative(
        process.cwd(),
        `${__dirname}/../../studio/utils/desk/DocumentIcon.tsx`,
      ),
    )} or use an existing icon ${cyan("http://localhost:3333/cms/engine")}`,
  );

  if (answers.parentType) {
    console.log(`› Clean up the desk structure`);
    console.log(`› Check the sitemap`);
  }

  console.log(`› Check the frontend`);
}

askName();

const build = (answers) => {
  const { name, singleton, addDesk } = answers;
  if (!name.trim().length) return readline.close();

  const pascalName = `${pascalCase(name)}`;
  const lowerName = name.toLowerCase();
  const schemaName = `page.${name.toLowerCase().replace(/\s/g, "")}`;
  const documentId = schemaName.replace("page.", "page_");

  console.log("");
  createType(schemaName, { linkable: true, translatable: true });

  createSchema(lowerName, pascalName, schemaName, {
    replacer: "MyPage",
    prototypeFile: `${__dirname}/page.mypage.tsx`,
    schemaImportPrefix: "page",
    translatable: true,
  });

  createQuery(name, schemaName, documentId, answers);
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
 * Add query
 */

function createQuery(name, schemaName, documentId, answers) {
  const { singleton, parentType, parentId } = answers;

  const filePath = `${__dirname}/../../queries/sitemap.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  let str;

  // singleton query
  if (singleton) {
    str = `
    \${getSingletonQuery('${documentId}')},`;
  } else {
    // page with a parent query
    if (parentId) {
      str = `
    // ${name}
    ...*[_type == "${schemaName}"] {
      \${baseFields},
      "paths": {
        \${languages.map(
          (language) =>
            \`"\${language.id}": "/" + *[_id match "*${parentId}"] { "slug": slug.\${language.id}.current}[0].slug  +"/"+ slug.\${language.id}.current\`
          )
        }
      },
    },
`;

      // top level page
    } else {
      str = `
    // ${name}
    ...*[_type == "${schemaName}"] {
      \${baseFields},
      "paths": {
        \${languages.map(
          (language) =>
            \`"\${language.id}": "/" + slug.\${language.id}.current\`,
        )}
      },
    },
`;
    }
  }

  lines = addLine(str, lines, "// content pages", -1);
  fs.writeFileSync(filePath, lines.join("\n"));
  console.log(
    `› Added query in ${cyan(path.relative(process.cwd(), filePath))}`,
  );
}

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
      singleton(S, { id: '${documentId}', type: '${schemaName}' }),
    `;
  } else {
    if (parentId) {
      str = `
        documentList(S, {
          type: '${schemaName}',
          title: '${pascalName}',
          filter: '_type == "${parentType}" || _type == "${schemaName}"',
        }),
      `;
    } else {
      str = `
        documentList(S, { type: '${schemaName}', title: '${name}' }),
      `;
    }
  }

  lines = addLine(str, lines, `type: "page.content"`, -1);
  lines = addLine(
    `,\n                    '${schemaName}'`,
    lines,
    `] && !defined(parent)`,
    0,
  );

  fs.writeFileSync(filePath, lines.join("\n"));
  prettierFile(filePath);
  console.log(
    `› Added to desk structure in ${cyan(
      path.relative(process.cwd(), filePath),
    )}`,
  );
}
