import { DEMO_NESTED_BREADCRUMB } from "../../test/fixtures/breadcrumb";
import { getFlatBreadcrumb } from "./getFlatBreadcrumb";

test("test path", () => {
  const breadcrumb = getFlatBreadcrumb(DEMO_NESTED_BREADCRUMB);
  expect(breadcrumb[0].title).toEqual(DEMO_NESTED_BREADCRUMB.title);
  expect(breadcrumb[1].title).toEqual(DEMO_NESTED_BREADCRUMB?.parent?.title);
  expect(breadcrumb[2].title).toEqual(
    DEMO_NESTED_BREADCRUMB?.parent?.parent?.title,
  );
  expect(breadcrumb[3].title).toEqual(
    DEMO_NESTED_BREADCRUMB.parent?.parent?.parent?.title,
  );
  expect(breadcrumb[4].title).toEqual(
    DEMO_NESTED_BREADCRUMB.parent?.parent?.parent?.parent?.title,
  );
  expect(breadcrumb[5]).toBeUndefined();
});
