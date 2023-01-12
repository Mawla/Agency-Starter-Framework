import { LanguageType } from "../../languages";
import { SitemapItemType, SitemapType } from "../../queries/sitemap";
import { getItemForPath } from "./getItemForPath";

export const getBreadCrumbForPath = (
  path: string | null,
  sitemap: SitemapType,
  language: LanguageType
): SitemapItemType[] => {
  if (!path) return [];
  const pathParts = path?.split("#")[0].split("/");

  return path
    ?.split("/")
    .slice(1)
    .map((x, i) =>
      getItemForPath(
        `/${pathParts.slice(1, i + 2).join("/")}`,
        sitemap,
        language
      )
    )
    .filter(Boolean)
    .map((item) => ({
      ...item,
      path: item?.paths[language],
      title: item?.titles[language],
    })) as SitemapItemType[];
};
