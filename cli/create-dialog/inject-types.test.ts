import { injectTypes } from "./inject-types";

test("inject types in types.sanity.ts", () => {
  const result = injectTypes({
    dialogName: "Test",
  });

  expect(result.includes(`"dialog.test":`)).toBeTruthy();
  expect(result.includes(`"dialog.test",`)).toBeTruthy();
});
