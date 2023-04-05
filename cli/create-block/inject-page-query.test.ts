import { injectPageQuery } from "./inject-page-query";

test("inject query page.query.ts", () => {
  const result = injectPageQuery({
    blockName: "Test",
  });

  expect(
    result.includes(
      `import { getTestQuery } from "../blocks/test/test.query";`,
    ),
  ).toBeTruthy();

  expect(result.includes("${getTestQuery(language)},")).toBeTruthy();
});
