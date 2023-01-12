import { SitemapItemType, SitemapType } from "../../queries/sitemap";

export const getItemForId = (
  id: string,
  sitemap: SitemapType
): SitemapItemType | null => {
  return sitemap?.find((item) => item?._id === id) ?? null;
};
