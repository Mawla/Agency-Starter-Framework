import { createSchema } from "./create-schema";

test("create schema with eyebrow", () => {
  const result = createSchema({
    moduleName: "Test",
    moduleTitle: "Test",
    fields: ["eyebrow"],
    moduleDescription: "",
  });

  expect(result.includes(`name: "eyebrow",`)).toBeTruthy();
});

test("create schema with title", () => {
  const result = createSchema({
    moduleName: "Test",
    moduleTitle: "Test",
    fields: ["title"],
    moduleDescription: "",
  });

  expect(result.includes(`name: "title",`)).toBeTruthy();
});

test("create schema with intro", () => {
  const result = createSchema({
    moduleName: "Test",
    moduleTitle: "Test",
    fields: ["intro"],
    moduleDescription: "",
  });

  expect(result.includes(`name: "intro",`)).toBeTruthy();
});

test("create schema with image", () => {
  const result = createSchema({
    moduleName: "Test",
    moduleTitle: "Test",
    fields: ["image"],
    moduleDescription: "",
  });

  expect(result.includes(`name: "image",`)).toBeTruthy();
});

test("create schema with items", () => {
  const result = createSchema({
    moduleName: "Test",
    moduleTitle: "Test",
    fields: ["items"],
    moduleDescription: "",
  });

  expect(result.includes(`name: "items",`)).toBeTruthy();
});

test("create schema with buttons", () => {
  const result = createSchema({
    moduleName: "Test",
    moduleTitle: "Test",
    fields: ["buttons"],
    moduleDescription: "",
  });

  expect(result.includes(`name: "buttons",`)).toBeTruthy();
});
