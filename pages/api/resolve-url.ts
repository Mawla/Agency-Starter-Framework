import sanityClient from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { config } from "../../helpers/sanity/config";
import { getPathForId } from "../../helpers/sitemap/getPathForId";
import { baseLanguage } from "../../languages";
import { SitemapItemType, getSitemapQuery } from "../../queries/sitemap";

export const client = sanityClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id, _type } = req.query;

  if (!_id || Array.isArray(_id) || Array.isArray(_type)) {
    return res.status(400).json({ message: "invalid arguments." });
  }

  const sitemap: SitemapItemType[] = await client.fetch(getSitemapQuery());
  const path = getPathForId(_id, sitemap, baseLanguage);

  if (path === "/" && _id.indexOf("page_homepage") === -1) {
    return res
      .status(400)
      .json({ message: `Missing slug for document id ${_id}.` });
  }

  if (!path) {
    return res
      .status(400)
      .json({ message: `No page found for document id ${_id}.` });
  }

  res.redirect(307, path);
  res.end();
};

export default handler;
