import { pascalCase } from "./pascal-case";

test("pascal names", () => {
  const result = pascalCase("Test page");
  expect(result).toEqual("TestPage");
});
