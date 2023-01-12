import { LanguageType } from "../../languages";
import { SitemapItemType, SitemapType } from "../../queries/sitemap";

export const getItemForPath = (
  path: string,
  sitemap: SitemapType,
  language: LanguageType
): SitemapItemType | null => {
  return sitemap?.find((item) => item?.paths[language] === path) ?? null;
};
