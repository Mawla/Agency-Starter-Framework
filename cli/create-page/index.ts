/**
 * Script to generate new Sanity page
 * and insert it in types and sanity schemas index
 *
 * sanity exec ./cli/create-page.ts -- --write
 *
 */
import { LINKABLE_SCHEMAS } from "../../types.sanity";
import { createSchema } from "./create-schema";
import { formatName } from "./format-name";
import { injectDeskStructure } from "./inject-desk-structure";
import { injectSchema } from "./inject-schema";
import { injectTypes } from "./inject-types";
import { text, intro, outro, confirm, isCancel, select } from "@clack/prompts";

init();

export type AnswersType = {
  pageName: string;
  addToDesk: boolean;
  pageType: "article" | "singleton" | "collection" | "content";
  articleName?: string;
  parentType?: string;
};

async function init() {
  intro(`Let's create a page`);

  let pageType = await select({
    message: "What type of page is it?",
    options: [
      { value: "content", title: "Basic content page" },
      {
        value: "collection",
        title: "Singleton + articles (e.g blogs overview and blog articles)",
      },
      { value: "singleton", title: "Singleton (e.g blogs overview)" },
      { value: "article", title: "Article (e.g blog articles" },
    ],
  });
  if (isCancel(pageType)) process.exit(0);

  let PAGE_NAME_QUESTIONS: Record<AnswersType["pageType"], string> = {
    content: `What is the name of the page?`,
    collection: `What is the name of the parent page? (plural, e.g. "Blogs" or "Videos")`,
    singleton: `What is the name of the page? (e.g. "Blogs" or "Videos")`,
    article: `What is the name of the article page? (singular, e.g. "Blog" or "Video")`,
  };

  let pageName = await text({
    message: PAGE_NAME_QUESTIONS[pageType],
    validate(value) {
      if (!value || value.trim().length === 0) return `Value is required!`;
    },
  });
  if (isCancel(pageName)) process.exit(0);

  let articleName;
  if (pageType === "collection") {
    articleName = await text({
      message: PAGE_NAME_QUESTIONS["article"],
      validate(value) {
        if (!value || value.trim().length === 0) return `Value is required!`;
      },
    });
    if (isCancel(articleName)) process.exit(0);
  }

  let parentType;
  if (pageType === "article") {
    parentType = await select({
      message: "Does it have a singleton parent page?",
      options: Object.keys(LINKABLE_SCHEMAS).map((schema) => ({
        value: schema,
        title: schema,
      })),
    });
    if (isCancel(parentType)) process.exit(0);
  }

  let addToDesk = await confirm({
    message: "Do you want to add it to the studio desk structure?",
  });
  if (isCancel(addToDesk)) process.exit(0);

  pageName = String(pageName);

  const answers = {
    pageName: String(pageName),
    pageType: String(pageType) as AnswersType["pageType"],
    addToDesk: Boolean(addToDesk),
    articleName: String(articleName),
    parentType: String(parentType),
  };

  if (pageType === "collection") {
    injectTypes({ ...answers });
    injectSchema({ ...answers });
    createSchema({ ...answers, pageType: "singleton" });

    if (articleName) {
      injectTypes({ ...answers, pageName: articleName });
      injectSchema({ ...answers, pageName: articleName });
      createSchema({
        ...answers,
        pageName: articleName,
        pageType: "article",
        parentType: formatName(answers.pageName).schemaName,
      });
    }
  } else {
    injectTypes(answers);
    injectSchema(answers);
    createSchema(answers);
  }

  if (answers.addToDesk) {
    injectDeskStructure(answers);
  }
  outro(`You're all set!`);
}
