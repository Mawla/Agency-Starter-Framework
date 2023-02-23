import { injectSchema } from "./inject-schema";

test("inject schema in sanity studio/schemas/index.ts", () => {
  const result = injectSchema({
    pageName: "Tests",
  });

  expect(
    result.includes(`import pageTests from "./documents/page.tests";`),
  ).toBeTruthy();

  expect(result.includes(`pageTests,`)).toBeTruthy();
});
