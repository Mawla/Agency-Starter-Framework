import { injectLine } from "./inject-line";

test("add line", () => {
  const result = injectLine({
    addition: "foo",
    lines: ["1", "2", "3", "4", "5"],
    needle: "3",
  });

  expect(result).toEqual(["1", "2", "3", "foo", "4", "5"]);
});

test("inject line adjust needle up", () => {
  const result = injectLine({
    addition: "foo",
    lines: ["1", "2", "3", "4", "5"],
    needle: "3",
    offset: -2,
  });

  expect(result).toEqual(["foo", "1", "2", "3", "4", "5"]);
});

test("inject line adjust needle down", () => {
  const result = injectLine({
    addition: "foo",
    lines: ["1", "2", "3", "4", "5"],
    needle: "3",
    offset: +3,
  });

  expect(result).toEqual(["1", "2", "3", "4", "5", "foo"]);
});

test("insert in array", () => {
  const result = injectLine({
    lines: [
      "export const LINKABLE_SCHEMAS = pick(",
      "  SCHEMAS,",
      '  "page.a",',
      '  "page.b",',
      ");",
    ],
    addition: `  "foo",`,
    needle: "export const LINKABLE_SCHEMAS",
    delimiter: ");",
    offset: 2,
  });

  expect(result).toEqual([
    "export const LINKABLE_SCHEMAS = pick(",
    "  SCHEMAS,",
    '  "foo",',
    '  "page.a",',
    '  "page.b",',
    ");",
  ]);
});

test("insert in array single line", () => {
  const result = injectLine({
    lines: [
      'export const LINKABLE_SCHEMAS = pick(SCHEMAS, "page.a", "page.b");',
    ],
    addition: ` "foo",`,
    needle: "export const LINKABLE_SCHEMAS",
    delimiter: ");",
    offset: 2,
  });

  expect(result).toEqual([
    'export const LINKABLE_SCHEMAS = pick(SCHEMAS, "page.a", "page.b", "foo", );',
  ]);
});
