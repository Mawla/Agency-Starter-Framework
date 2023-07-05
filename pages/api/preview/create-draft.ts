import { config } from "../../../helpers/sanity/config";
import { withSentryOptional } from "../../../helpers/sentry/with-sentry-optional";
import { createClient } from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";

export const client = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

type Data = string | { _rev: string };

function warning(msg: string) {
  return `<p style="
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif; 
  padding: 10px; 
  border-radius: 3px;
  background: lightyellow; 
  line-height: 1.5;
  border: 1px solid rgba(0,0,0,.1);">${msg}</p>`;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id } = req.query;

  if (!_id) {
    return res.status(400).send(warning("invalid id."));
  }

  if (Array.isArray(_id)) {
    return res.status(400).send(warning("invalid arguments."));
  }

  const doc = await client.getDocument(_id.replace("drafts.", ""));

  if (!doc) {
    return res.status(400).send(warning("no document found."));
  }

  const result = await client.createIfNotExists({
    ...doc,
    _id: `drafts.${doc._id}`,
  });

  return res.json({ _rev: result._rev });
};

export default withSentryOptional(handler);
