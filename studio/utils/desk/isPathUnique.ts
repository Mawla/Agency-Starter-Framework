import { getSitemapQuery, SitemapType } from "../../../queries/sitemap.query";
import { SANITY_API_VERSION } from "../../../types.sanity";

export const isPathUnique = async (slug: string, context: any) => {
  const client = context.getClient({
    apiVersion: SANITY_API_VERSION,
  });

  const { document } = context;
  const id = document._id.replace(/^drafts\./, "");

  // we need a timeout here because sometimes the previous slug is returned by the query
  await new Promise((resolve) => setTimeout(resolve, 1000));

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

  return matches.length === 0;
};
