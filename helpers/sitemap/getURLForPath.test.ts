import { getURLForPath } from "./getURLForPath";

test("test base language full url", () => {
  const path = getURLForPath("test.com", "/foo");
  expect(path).toEqual("https://test.com/foo");
});

test("test base language homepage full url", () => {
  const path = getURLForPath("test.com", "/");
  expect(path).toEqual("https://test.com");
});

test("test alternative language homepage full url", () => {
  const path = getURLForPath("test.com", "/it");
  expect(path).toEqual("https://test.com/it");
});

test("test alternative language", () => {
  const path = getURLForPath("test.com", "/it/foo");
  expect(path).toEqual("https://test.com/it/foo");
});

test("test no domain", () => {
  const path = getURLForPath(null as any, "/it/foo");
  expect(path).toEqual("/it/foo");
});
