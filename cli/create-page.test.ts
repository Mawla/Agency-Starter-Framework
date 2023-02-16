import { injectTypes } from "./create-page";

test("test injectTypes", () => {
  const result = injectTypes({
    name: "Test",
    isSingleton: true,
    addToDesk: true,
  });

  // schema type
  expect(result.includes(`"page.test":`)).toEqual(true);

  // linkable type
  expect(result.includes(`"page.test",`)).toEqual(true);
});
