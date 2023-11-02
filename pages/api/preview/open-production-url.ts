import { getClient } from "../../../helpers/sanity/server";
import { getPathForId } from "../../../helpers/sitemap/getPathForId";
import { getSitemapQuery } from "../../../queries/sitemap.query";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = string;

function warning(msg: string) {
  return `<p style="
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif; 
  padding: 10px; 
  border-radius: 3px;
  background: lightyellow; 
  line-height: 1.5;
  border: 1px solid rgba(0,0,0,.1);">${msg}</p>`;
}

export const config = {
  maxDuration: 30,
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(401).send(warning("Missing id parameter"));
  }

  const sitemap = await getClient().fetch(getSitemapQuery());
  const path = getPathForId(id, sitemap);

  if (path) {
    return res.redirect(
      `${process.env.SANITY_STUDIO_PROJECT_PATH?.replace(/\/+$/, "")}${path}`,
    );
  }

  return res
    .status(401)
    .send(warning("Page not found. The page is likely not published."));
};

export default handler;
