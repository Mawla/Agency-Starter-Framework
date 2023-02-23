import { formatName } from "./format-name";

test("create names", () => {
  const result = formatName("Test page");

  expect(Object.keys(result)).toEqual([
    "pascalName",
    "lowerName",
    "schemaName",
    "documentId",
  ]);

  expect(result.pascalName).toEqual("TestPage");
  expect(result.lowerName).toEqual("test page");
  expect(result.schemaName).toEqual("page.testpage");
  expect(result.documentId).toEqual("page_testpage");
});
