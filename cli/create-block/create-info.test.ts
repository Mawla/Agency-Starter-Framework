import { createInfo } from "./create-info";

test("create info file", () => {
  const result = createInfo({
    blockName: "Block 1",
    blockTitle: "Test",
    blockDescription: "testing 123",
    fields: ["title", "intro", "buttons", "image", "items"],
  });

  const resultObj = JSON.parse(result);
  resultObj.date = "test-date";

  expect(resultObj).toEqual({
    title: "Test",
    description: "testing 123",
    name: "Block 1",
    schemaName: "block.block1",
    fields: ["title", "intro", "buttons", "image", "items"],
    date: "test-date",
  });
});
