import { createTests } from "./create-tests";

test("create test with no fields", () => {
  const result = createTests({
    blockName: "Test",
  });

  expect(result.includes(`it(`)).toBeFalsy();
});

test("create test with title", () => {
  const result = createTests({
    blockName: "Test",
    fields: ["title"],
  });

  expect(result.includes(`it("renders title"`)).toBeTruthy();
});

test("create test with intro", () => {
  const result = createTests({
    blockName: "Test",
    fields: ["intro"],
  });

  expect(result.includes(`it("renders intro"`)).toBeTruthy();
});

test("create test with image", () => {
  const result = createTests({
    blockName: "Test",
    fields: ["image"],
  });

  expect(result.includes(`it("renders image"`)).toBeTruthy();
});

test("create test with buttons", () => {
  const result = createTests({
    blockName: "Test",
    fields: ["buttons"],
  });

  expect(result.includes(`it("renders buttons"`)).toBeTruthy();
});

test("create test with items", () => {
  const result = createTests({
    blockName: "Test",
    fields: ["items"],
  });

  expect(result.includes(`it("renders items"`)).toBeTruthy();
});
