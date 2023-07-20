import { createQuery } from "./create-query";

test("create query with no fields", () => {
  const result = createQuery({
    blockName: "Test",
  });

  expect(
    result.replace(/\s/g, "").includes(
      `export const getTestQuery = (language: LanguageType) => groq\`
      _type == "block.test" => {
        _key,
        _type,
      }\`;`.replace(/\s/g, ""),
    ),
  ).toBeTruthy();
});

test("create query with title", () => {
  const result = createQuery({
    blockName: "Test",
    fields: ["title"],
  });

  expect(result.includes(`title,`)).toBeTruthy();
});

test("create query with intro", () => {
  const result = createQuery({
    blockName: "Test",
    fields: ["intro"],
  });

  expect(result.includes(`intro[]`)).toBeTruthy();
});

test("create query with image", () => {
  const result = createQuery({
    blockName: "Test",
    fields: ["image"],
  });

  expect(result.includes(`"image"`)).toBeTruthy();
});

test("create query with items", () => {
  const result = createQuery({
    blockName: "Test",
    fields: ["items"],
  });

  expect(result.includes(`items[] { _key, title },`)).toBeTruthy();
});

test("create query with buttons", () => {
  const result = createQuery({
    blockName: "Test",
    fields: ["buttons"],
  });

  expect(result.includes(`buttons[]`)).toBeTruthy();
});
