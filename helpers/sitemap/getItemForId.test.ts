import { DEMO_SITEMAP } from "../../test/fixtures/sitemap";
import { getItemForId } from "./getItemForId";

test("test id", () => {
  const item = getItemForId("xxx3", DEMO_SITEMAP);
  expect(item).not.toBeUndefined();
  expect((item as any).title).toBe("content page 3");
});

test("test no id", () => {
  const item = getItemForId("foo", DEMO_SITEMAP);
  expect(item).toBeNull();
});
