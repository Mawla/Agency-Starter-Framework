import { injectDeskStructure } from "./inject-desk-structure";
import { getStructureCollection } from "./templates/structure-collection";
import { getStructureDocumentList } from "./templates/structure-document-list";
import { getStructureSingleton } from "./templates/structure-singleton";

test("singleton inject desk structure in sanity studio/structure", () => {
  const result = injectDeskStructure({
    pageName: "Tests",
    pageType: "singleton",
  });

  expect(
    result.includes(
      getStructureSingleton({
        documentId: "page_tests",
        schemaName: "page.tests",
      }),
    ),
  ).toBeTruthy();
});

test("content inject desk structure in sanity studio/structure", () => {
  const result = injectDeskStructure({
    pageName: "Test",
    pageType: "content",
  });

  expect(
    result.includes(
      getStructureDocumentList({
        pascalName: "Test",
        schemaName: "page.test",
      }),
    ),
  ).toBeTruthy();
});

test("article inject desk structure in sanity studio/structure", () => {
  const result = injectDeskStructure({
    pageName: "Test",
    pageType: "article",
  });

  expect(
    result.includes(
      getStructureDocumentList({
        pascalName: "Test",
        schemaName: "page.test",
      }),
    ),
  ).toBeTruthy();
});

test("collection inject desk structure in sanity studio/structure", () => {
  const result = injectDeskStructure({
    pageName: "Tests",
    pageType: "collection",
    articleName: "Test",
  });

  expect(
    result.includes(
      getStructureCollection({
        documentId: "page_tests",
        pageName: "Tests",
        schemaName: "page.tests",
        articleName: "Test",
        articleSchemaName: "page.test",
      }),
    ),
  ).toBeTruthy();
});
