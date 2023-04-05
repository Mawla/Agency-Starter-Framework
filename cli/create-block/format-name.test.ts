import { formatName } from "./format-name";

test("create names", () => {
  const result = formatName("Test block");

  expect(Object.keys(result)).toEqual([
    "pascalName",
    "lowerName",
    "schemaName",
  ]);

  expect(result.pascalName).toEqual("TestBlock");
  expect(result.lowerName).toEqual("testblock");
  expect(result.schemaName).toEqual("block.testblock");
});
