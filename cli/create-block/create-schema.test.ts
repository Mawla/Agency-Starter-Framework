import { createSchema } from "./create-schema";

test("create schema with title", () => {
  const result = createSchema({
    blockName: "Test",
    blockTitle: "Test",
    fields: ["title"],
    blockDescription: "",
  });

  expect(result.includes(`name: "title",`)).toBeTruthy();
});

test("create schema with intro", () => {
  const result = createSchema({
    blockName: "Test",
    blockTitle: "Test",
    fields: ["intro"],
    blockDescription: "",
  });

  expect(result.includes(`name: "intro",`)).toBeTruthy();
});

test("create schema with image", () => {
  const result = createSchema({
    blockName: "Test",
    blockTitle: "Test",
    fields: ["image"],
    blockDescription: "",
  });

  expect(result.includes(`name: "image",`)).toBeTruthy();
});

test("create schema with items", () => {
  const result = createSchema({
    blockName: "Test",
    blockTitle: "Test",
    fields: ["items"],
    blockDescription: "",
  });

  expect(result.includes(`name: "items",`)).toBeTruthy();
});

test("create schema with buttons", () => {
  const result = createSchema({
    blockName: "Test",
    blockTitle: "Test",
    fields: ["buttons"],
    blockDescription: "",
  });

  expect(result.includes(`name: "buttons",`)).toBeTruthy();
});
