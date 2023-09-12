import { config as sanityConfig } from "../../helpers/sanity/config";
import { getPathForId } from "../../helpers/sitemap/getPathForId";
import { getLanguagePath } from "../../languages";
import { SitemapItemType, getSitemapQuery } from "../../queries/sitemap.query";
import { createClient } from "@sanity/client";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Readable } from "node:stream";

export const client = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

type Data = {
  message: string;
};

const secret = process.env.SANITY_WEBHOOK_SECRET;

// curl -X POST -H "Content-Type: text/plain" --data "{ _id: 'test', _type: 'test' }" http://localhost:3000/api/revalidate
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let signature = req.headers[SIGNATURE_HEADER_NAME];
  signature = Array.isArray(signature) ? signature[0] : signature;

  console.log(req.headers);

  const buf = await buffer(req);
  const rawBody = buf
    .toString("utf8")
    // .replace('_id', '"_id"')
    // .replace('_type', '"_type"')
    .replace(/'/g, '"');

  console.log(rawBody);

  const { _id, _type, language } = JSON.parse(
    JSON.parse(JSON.stringify(rawBody)),
  );
  console.log(_id, _type);

  if (req.method !== "POST") {
    console.error("Must be a POST request");
    return res.status(401).json({ message: "Must be a POST request" });
  }

  if (!isValidSignature(rawBody, signature || "", secret || "")) {
    console.error("Invalid signature", rawBody, signature);
    res.status(401).json({ message: "Invalid signature" });
    return;
  }

  const sitemap: SitemapItemType[] = await client.fetch(getSitemapQuery());

  try {
    let messages = [];
    const path = `${getLanguagePath(language)}${getPathForId(_id, sitemap)}`;
    await res.revalidate(path);
    const message = `Revalidated "${_type}" with path ${path}`;
    messages.push(message);
    console.log(message);

    return res.status(200).json({ message: messages.join("\n") });
  } catch (err) {
    return res.status(500).send({ message: "Error revalidating" });
  }
}
// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export function jsonParser(blob: any) {
  let parsed = JSON.parse(blob);
  if (typeof parsed === "string") parsed = jsonParser(parsed);
  return parsed;
}
