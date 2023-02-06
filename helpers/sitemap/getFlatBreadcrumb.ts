import {
  FlatBreadcrumbType,
  NestedBreadcrumbType,
} from "../../components/breadcrumb/breadcrumb.query";

export const getFlatBreadcrumb = (breadcrumb: NestedBreadcrumbType) => {
  const flatBreadcrumb: FlatBreadcrumbType = [
    {
      title: breadcrumb.title,
      path: breadcrumb.path,
    },
  ];

  if (breadcrumb.parent) {
    flatBreadcrumb.push(...getFlatBreadcrumb(breadcrumb.parent));
  }

  return flatBreadcrumb;
};
