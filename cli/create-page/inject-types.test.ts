import { injectTypes } from "./inject-types";

test("inject types in types.sanity.ts", () => {
  const result = injectTypes({
    pageName: "Test",
  });

  expect(result.includes(`"page.test":`)).toBeTruthy();
  expect(result.includes(`"page.test",`)).toBeTruthy();
});
