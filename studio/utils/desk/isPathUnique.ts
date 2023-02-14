import { getSitemapQuery, SitemapType } from "../../../queries/sitemap.query";

export const isPathUnique = async (slug: string, context: any) => {
  const client = context.getClient({
    apiVersion: "vX",
  });

  const { document } = context;
  const id = document._id.replace(/^drafts\./, "");

  // fetch all sitemap items
  const sitemap: SitemapType = await client.fetch(getSitemapQuery());

  // get this document from the sitemap
  const sitemapItem = sitemap
    .filter(Boolean)
    .find(({ _id }) => document?._id === _id);

  // find all paths that match this documents path
  const matches = sitemap.filter(Boolean).filter(({ path, language, _id }) => {
    const sitemapItemPath = sitemapItem?.path;
    const sitemapItemLanguage = sitemapItem?.language;

    return (
      _id !== `${id}` &&
      _id !== `drafts.${id}` &&
      path === sitemapItemPath &&
      language === sitemapItemLanguage
    );
  });

  console.log(matches);

  return matches.length === 0;
};
