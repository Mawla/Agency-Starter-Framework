import { DEMO_SITEMAP } from "../../test/fixtures/sitemap";
import { getItemForPath } from "./getItemForPath";

test("test non-existent existing path", () => {
  const item = getItemForPath("/foo", DEMO_SITEMAP, "en");
  expect(item).toBeNull();
});

test("test existing path", () => {
  const item = getItemForPath("/it/page1/page2/page3", DEMO_SITEMAP, "it");
  expect((item as any).titles.it).toEqual("Content pagina 3");
});

test("test existing path wrong language", () => {
  const item = getItemForPath("/nl/page1/page2/page3", DEMO_SITEMAP, "en");
  expect(item).toBeNull();
});
