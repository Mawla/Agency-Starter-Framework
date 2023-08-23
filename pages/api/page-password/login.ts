import { config } from "../../../helpers/sanity/config";
import { createClient } from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";

export const client = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export type BodyType = {
  pageId: string;
  password: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<boolean>) => {
  const { pageId, password }: BodyType = JSON.parse(req.body);

  const passwordCheck = await client.fetch(
    `*[_type == 'password' && references("${pageId}")][0].password`,
  );

  return password === passwordCheck
    ? res.status(200).json(true)
    : res.status(401).json(false);
};

export default handler;
