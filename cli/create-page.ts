/**
 * Script to generate new Sanity page
 * and insert it in types and sanity schemas index
 *
 * sanity exec ./cli/create-page.ts -- --write
 *
 */
import { createSchema } from "./create-page/create-schema";
import { injectDeskStructure } from "./create-page/inject-desk-structure";
import { injectSchema } from "./create-page/inject-schema";
import { injectTypes } from "./create-page/inject-types";
import { text, intro, outro, confirm, isCancel, select } from "@clack/prompts";

const args = process.argv.slice(2);
const WRITE = args.includes("--write");

init();

export type AnswersType = {
  pageName: string;
  addToDesk: boolean;
  pageType: "article" | "singleton" | "collection" | "content";
  articleName?: string;
};

async function init() {
  intro(`Let's create a single use page`);

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
  };

  if (isCancel(answers)) return;

  if (pageType === "collection") {
    injectTypes({ ...answers }, WRITE);
    injectSchema({ ...answers }, WRITE);
    createSchema({ ...answers, pageType: "singleton" }, WRITE);

    if (articleName) {
      injectTypes({ ...answers, pageName: articleName }, WRITE);
      injectSchema({ ...answers, pageName: articleName }, WRITE);
      createSchema(
        {
          ...answers,
          pageName: `${articleName} overview`,
          pageType: "article",
        },
        WRITE,
      );
    }
  } else {
    injectTypes(answers, WRITE);
    injectSchema(answers, WRITE);
    createSchema(answers, WRITE);
  }

  if (answers.addToDesk) {
    injectDeskStructure(answers, WRITE);
  }
  outro(`You're all set!`);
}
