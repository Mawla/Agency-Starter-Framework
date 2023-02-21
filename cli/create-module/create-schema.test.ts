import { createSchema } from "./create-schema";

test("create query with title", () => {
  const result = createSchema({
    moduleName: "Test",
    fields: ["title"],
  });

  expect(result.includes(`name: "eyebrow",`)).toBeTruthy();
  expect(result.includes(`name: "title",`)).toBeTruthy();
});

test("create query with intro", () => {
  const result = createSchema({
    moduleName: "Test",
    fields: ["intro"],
  });

  expect(result.includes(`name: "intro",`)).toBeTruthy();
});

test("create query with image", () => {
  const result = createSchema({
    moduleName: "Test",
    fields: ["image"],
  });

  expect(result.includes(`name: "image",`)).toBeTruthy();
});

test("create query with items", () => {
  const result = createSchema({
    moduleName: "Test",
    fields: ["items"],
  });

  expect(result.includes(`name: "items",`)).toBeTruthy();
});

test("create query with buttons", () => {
  const result = createSchema({
    moduleName: "Test",
    fields: ["buttons"],
  });

  expect(result.includes(`name: "buttons",`)).toBeTruthy();
});
