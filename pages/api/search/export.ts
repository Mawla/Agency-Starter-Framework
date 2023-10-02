import { sanityClient } from "../sanity-client";
import { getExportQuery } from "./export.query";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData =
  | {
      message?: string;
      data?: string;
    }
  | string;

export const config = {
  maxDuration: 300,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { id, type } = req.query;

  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const allPages = await sanityClient.fetch(
    getExportQuery({ id: id as string, type: type as string }),
  );

  if (!allPages) {
    return res.status(400).json({ message: `Failed to fetch page data` });
  }

  res.status(200).send(JSON.stringify(allPages));
}
