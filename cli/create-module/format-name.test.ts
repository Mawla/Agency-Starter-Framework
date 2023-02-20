import { formatName } from "./format-name";

test("create names", () => {
  const result = formatName("Test module");

  expect(Object.keys(result)).toEqual([
    "pascalName",
    "lowerName",
    "schemaName",
  ]);

  expect(result.pascalName).toEqual("TestModule");
  expect(result.lowerName).toEqual("test module");
  expect(result.schemaName).toEqual("module.testmodule");
});
