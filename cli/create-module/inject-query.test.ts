import { injectQuery } from "./inject-query";

test("inject query page.query.ts", () => {
  const result = injectQuery({
    moduleName: "Test",
  });

  expect(
    result.includes(
      `import { getTestQuery } from "../modules/test/test.query";`,
    ),
  ).toBeTruthy();

  expect(result.includes("${getTestQuery(language)},")).toBeTruthy();
});
