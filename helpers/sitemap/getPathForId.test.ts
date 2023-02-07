import { DEMO_SITEMAP } from "../../test/fixtures/sitemap";
import { getPathForId } from "./getPathForId";

test("test non-existent existing path", () => {
  const path = getPathForId("foo", DEMO_SITEMAP, "en");
  expect(path).toEqual("");
});

test("test existing path", () => {
  const path = getPathForId("xxx3", DEMO_SITEMAP, "es");
  expect(path).toEqual("/es/page1/page2/page3");
});

test("test existing path with wrong language", () => {
  const path = getPathForId("/es/page1/page2/page3", DEMO_SITEMAP, "en");
  expect(path).toEqual("");
});
