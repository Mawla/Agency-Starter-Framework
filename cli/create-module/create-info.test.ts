import { createInfo } from "./create-info";

test("create info file", () => {
  const result = createInfo({
    moduleName: "Block 1",
    moduleTitle: "Test",
    moduleDescription: "testing 123",
    fields: ["title", "eyebrow", "intro", "buttons", "image", "items"],
  });

  const resultObj = JSON.parse(result);
  resultObj.date = "test-date";

  expect(resultObj).toEqual({
    title: "Test",
    description: "testing 123",
    name: "Block 1",
    schemaName: "module.block1",
    fields: ["title", "eyebrow", "intro", "buttons", "image", "items"],
    date: "test-date",
  });
});
