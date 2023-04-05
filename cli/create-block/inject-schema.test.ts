import { injectSchema } from "./inject-schema";

test("inject schema in sanity studio/schemas/index.ts", () => {
  const result = injectSchema({
    blockName: "Test",
  });

  expect(
    result.includes(`import blockTest from "../../blocks/test/test.schema";`),
  ).toBeTruthy();

  expect(result.includes(`blockTest,`)).toBeTruthy();
});
