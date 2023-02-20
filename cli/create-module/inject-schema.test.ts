import { injectSchema } from "./inject-schema";

test("inject schema in sanity studio/schemas/index.ts", () => {
  const result = injectSchema({
    moduleName: "Test",
  });

  expect(
    result.includes(`import moduleTest from "../../modules/test/test.schema";`),
  ).toBeTruthy();

  expect(result.includes(`moduleTest,`)).toBeTruthy();
});
