import { DEMO_SITEMAP } from "../../test/fixtures/sitemap";
import { getIdForPath } from "./getIdForPath";

test("test non-existent existing path", () => {
  const id = getIdForPath("/foo", DEMO_SITEMAP, "en");
  expect(id.length).toEqual(0);
});

test("test existing path", () => {
  const id = getIdForPath("/it/page1/page2/page3", DEMO_SITEMAP, "it");
  expect(id).toEqual("xxx3");
});

test("test existing path with wrong language", () => {
  const id = getIdForPath("/es/page1/page2/page3", DEMO_SITEMAP, "en");
  expect(id).toEqual("");
});
