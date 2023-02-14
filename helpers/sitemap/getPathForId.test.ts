import { DEMO_SITEMAP } from "../../test/fixtures/sitemap";
import { getPathForId } from "./getPathForId";

test("test non-existent existing path", () => {
  const path = getPathForId("foo", DEMO_SITEMAP);
  expect(path).toEqual("");
});

test("test existing path", () => {
  const path = getPathForId("xxx3", DEMO_SITEMAP);
  expect(path).toEqual("/es/page1/page2/page3");
});
