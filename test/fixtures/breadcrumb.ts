import { NestedBreadcrumbType } from "../../components/breadcrumb/breadcrumb.query";
import { getFlatBreadcrumb } from "../../helpers/sitemap/getFlatBreadcrumb";

export const DEMO_NESTED_BREADCRUMB: NestedBreadcrumbType = {
  title: "page 4",
  path: "/test/test1/test2/test3/test4",
  parent: {
    title: "page 3",
    path: "/test/test1/test2/test3",
    parent: {
      title: "page 2",
      path: "/test/test1/test2",
      parent: {
        title: "page 1",
        path: "/test/test1",
        parent: {
          title: "page",
          path: "/test",
          parent: null,
        },
      },
    },
  },
};

export const DEMO_FLAT_BREADCRUMB = getFlatBreadcrumb(
  DEMO_NESTED_BREADCRUMB,
).reverse();
