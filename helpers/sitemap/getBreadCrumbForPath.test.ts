import { DEMO_SITEMAP } from "../../test/fixtures/sitemap";
import { getBreadCrumbForPath } from "./getBreadCrumbForPath";

test("test non-existent existing path", () => {
  const breadcrumb = getBreadCrumbForPath("/foo", DEMO_SITEMAP, "en");
  expect(breadcrumb.length).toEqual(0);
});

test("test level 1 english", () => {
  const breadcrumb = getBreadCrumbForPath("/page1", DEMO_SITEMAP, "en");
  expect(breadcrumb.length).toEqual(1);
});

test("test non-existent existing path with language", () => {
  const breadcrumb = getBreadCrumbForPath("/page1", DEMO_SITEMAP, "it");
  expect(breadcrumb.length).toEqual(0);
});

test("test level 1 spanish", () => {
  const breadcrumb = getBreadCrumbForPath("/it/page1", DEMO_SITEMAP, "it");
  expect(breadcrumb.length).toEqual(1);
});

test("test level 3", () => {
  const breadcrumb = getBreadCrumbForPath(
    "/it/page1/page2/page3",
    DEMO_SITEMAP,
    "it"
  );
  expect(breadcrumb.length).toEqual(3);
  expect(breadcrumb[2].path).toEqual("/it/page1/page2/page3");
  expect(breadcrumb[2].title).toEqual("Content pagina 3");

  expect(breadcrumb[0].paths.en).toEqual("/page1");
  expect(breadcrumb[1].paths.en).toEqual("/page1/page2");
  expect(breadcrumb[2].paths.en).toEqual("/page1/page2/page3");

  expect(breadcrumb[0].paths.it).toEqual("/it/page1");
  expect(breadcrumb[1].paths.it).toEqual("/it/page1/page2");
  expect(breadcrumb[2].paths.it).toEqual("/it/page1/page2/page3");
});
