import { LanguageType } from "../../languages";
import { SitemapType } from "../../queries/sitemap";

export const getPathForId = (
  id: string,
  sitemap: SitemapType,
  language: LanguageType
): string => {
  return sitemap.find((item) => item?._id === id)?.paths[language] || "";
};
