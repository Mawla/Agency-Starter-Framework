import { injectTypes } from "./inject-types";

test("inject types in types.sanity.ts", () => {
  const result = injectTypes({
    blockName: "Test",
  });

  expect(result.includes(`"block.test":`)).toBeTruthy();
  expect(result.includes(`"block.test",`)).toBeTruthy();
});
