import { LanguageType } from "../../../languages";
import { getSitemapQuery, SitemapType } from "../../../queries/sitemap.query";

export const isPathUnique = async (slug: string, context: any) => {
  const client = context.getClient({
    apiVersion: "vX",
  });

  const { document } = context;
  const id = document._id.replace(/^drafts\./, "");
  const language = context.path[1];

  // we need a timeout here because sometimes the previous slug is returned by the query
  await new Promise((resolve) => setTimeout(resolve, 500));

  // fetch all sitemap items
  const sitemap: SitemapType = await client.fetch(getSitemapQuery());

  // get this document from the sitemap
  const sitemapItem = sitemap.find(({ _id }) => document._id === _id);

  // find all paths that match this documents path
  const matches = sitemap.filter(({ paths, _id }) => {
    const languagePath = paths?.[language as LanguageType];
    const sitemapItemPath = sitemapItem?.paths[language as LanguageType];

    return (
      _id !== `${id}` &&
      _id !== `drafts.${id}` &&
      languagePath === sitemapItemPath
    );
  });

  return matches.length === 0;
};
