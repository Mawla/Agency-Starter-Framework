import { sortLines } from "./sort-lines";

test("sort lines abc", () => {
  const lines = ["xxx", "c", "b", "a", "yyy"];
  const result = sortLines({
    lines,
    fromNeedle: "xxx",
    toNeedle: "yyy",
  });

  expect(result).toEqual(["xxx", "a", "b", "c", "yyy"]);
});

test("sort lines", () => {
  const lines = [
    "x",
    "xx",
    "xxx",
    "start here",
    "x",
    "y",
    "z",
    "a",
    "d",
    "end here;",
    "xxxx",
    "xxxxx",
  ];
  const result = sortLines({
    lines,
    fromNeedle: "start here",
    toNeedle: "end here",
  });

  expect(result).toEqual([
    "x",
    "xx",
    "xxx",
    "start here",
    "a",
    "d",
    "x",
    "y",
    "z",
    "end here;",
    "xxxx",
    "xxxxx",
  ]);
});

test("adjust from line", () => {
  const lines = ["xxx", "c", "b", "a", "yyy"];
  const result = sortLines({
    lines,
    fromNeedle: "xxx",
    toNeedle: "yyy",
    adjustFromLine: +1,
  });

  expect(result).toEqual(["xxx", "c", "a", "b", "yyy"]);
});

test("adjust to line", () => {
  const lines = ["xxx", "c", "b", "a", "yyy"];
  const result = sortLines({
    lines,
    fromNeedle: "xxx",
    toNeedle: "c",
    adjustToLine: -1,
  });

  expect(result).toEqual(["xxx", "a", "b", "c", "yyy"]);
});
