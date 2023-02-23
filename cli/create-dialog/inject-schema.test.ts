import { injectSchema } from "./inject-schema";

test("inject schema in sanity studio/schemas/index.ts", () => {
  const result = injectSchema({
    dialogName: "Tests",
  });

  expect(
    result.includes(`import dialogTests from "./documents/dialog.tests";`),
  ).toBeTruthy();

  expect(result.includes(`dialogTests,`)).toBeTruthy();
});
