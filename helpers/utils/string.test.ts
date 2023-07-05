import { bumpHeadingLevel } from "./string";

test("increase heading level by 1", () => {
  expect(bumpHeadingLevel("span")).toEqual("span");
  expect(bumpHeadingLevel("div")).toEqual("div");
  expect(bumpHeadingLevel("h1")).toEqual("h2");
  expect(bumpHeadingLevel("h2")).toEqual("h3");
  expect(bumpHeadingLevel("h3")).toEqual("h4");
  expect(bumpHeadingLevel("h4")).toEqual("h5");
  expect(bumpHeadingLevel("h5")).toEqual("h6");
  expect(bumpHeadingLevel("h6")).toEqual("h6");
});
