import { injectPageQuery } from "./inject-page-query";

test("inject query page.query.ts", () => {
  const result = injectPageQuery({
    dialogName: "Test",
  });

  expect(result.includes(`_type == "dialog.test" => { ... }`)).toBeTruthy();
});
