import { createSchema } from "./create-schema";
import { getArticlePageSchema } from "./templates/article-page";
import { getContentPageSchema } from "./templates/content-page";
import { getSingletonPageSchema } from "./templates/singleton-page";

test("create content page schema", () => {
  const result = createSchema({
    pageName: "Test",
    pageType: "content",
  });

  expect(
    result.includes(
      getContentPageSchema({
        pageName: "Test",
        schemaName: "page.test",
      }),
    ),
  ).toBeTruthy();
});

test("create article page schema", () => {
  const result = createSchema({
    pageName: "Test",
    pageType: "article",
    parentType: "page.blogs",
  });

  expect(
    result.includes(
      getArticlePageSchema({
        schemaName: "page.test",
        pageName: "Test",
        parentId: "page_blogs",
        parentSchemaName: "page.blogs",
      }),
    ),
  ).toBeTruthy();
});

test("create singleton page schema", () => {
  const result = createSchema({
    pageName: "Test",
    pageType: "singleton",
  });

  expect(
    result.includes(
      getSingletonPageSchema({
        schemaName: "page.test",
        pageName: "Test",
      }),
    ),
  ).toBeTruthy();
});
