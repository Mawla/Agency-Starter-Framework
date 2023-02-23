import { injectTypes } from "./inject-types";

test("inject types in types.sanity.ts", () => {
  const result = injectTypes({
    moduleName: "Test",
  });

  expect(result.includes(`"module.test":`)).toBeTruthy();
  expect(result.includes(`"module.test",`)).toBeTruthy();
});
