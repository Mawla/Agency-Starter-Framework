import { LanguageType } from "../../languages";
import { SitemapType } from "../../queries/sitemap";

export const getIdForPath = (
  path: string,
  sitemap: SitemapType,
  language: LanguageType
): string => {
  return sitemap.find((item) => item?.paths[language] === path)?._id || "";
};
