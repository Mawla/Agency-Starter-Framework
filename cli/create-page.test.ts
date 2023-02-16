import { injectDeskStructure, injectSchema, injectTypes } from "./create-page";
import { getStructureDocumentList } from "./templates/page/structure-document-list";
import { getStructureSingleton } from "./templates/page/structure-singleton";

/**
 * Singleton
 */

test("test singleton inject types in types.sanity.ts", () => {
  const result = injectTypes({
    name: "Test",
    isSingleton: true,
    addToDesk: true,
  });

  expect(result.includes(`"page.test":`)).toBeTruthy();
  expect(result.includes(`"page.test",`)).toBeTruthy();
});

test("test singleton inject schema in sanity studio/schemas/index.ts", () => {
  const result = injectSchema({
    name: "Test",
    isSingleton: true,
    addToDesk: true,
  });

  expect(
    result.includes(`import pageTest from "./documents/page.test";`),
  ).toBeTruthy();

  expect(result.includes(`pageTest,`)).toBeTruthy();
});

test("test singleton inject desk structure in sanity studio/structure", () => {
  const result = injectDeskStructure({
    name: "Test",
    isSingleton: true,
    addToDesk: true,
  });

  expect(
    result.includes(
      getStructureSingleton({
        documentId: "page_test",
        schemaName: "page.test",
      }),
    ),
  ).toBeTruthy();
});

test("test no inject desk structure in sanity studio/structure", () => {
  const result = injectDeskStructure({
    name: "Test",
    isSingleton: true,
    addToDesk: false,
  });

  expect(
    result.includes(
      getStructureSingleton({
        documentId: "page_test",
        schemaName: "page.test",
      }),
    ),
  ).toBeFalsy();
});

/**
 * Document list
 */

test("test non-singleton inject types in types.sanity.ts", () => {
  const result = injectTypes({
    name: "Test",
    isSingleton: false,
    addToDesk: true,
  });

  expect(result.includes(`"page.test":`)).toBeTruthy();
  expect(result.includes(`"page.test",`)).toBeTruthy();
});

test("test non-singleton inject schema in sanity studio/schemas/index.ts", () => {
  const result = injectSchema({
    name: "Test",
    isSingleton: false,
    addToDesk: true,
  });

  expect(
    result.includes(`import pageTest from "./documents/page.test";`),
  ).toBeTruthy();

  expect(result.includes(`pageTest,`)).toBeTruthy();
});

test("test non-singleton inject desk structure in sanity studio/structure", () => {
  const result = injectDeskStructure({
    name: "Test",
    isSingleton: false,
    addToDesk: true,
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
