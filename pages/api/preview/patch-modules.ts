import { sanityClient } from "../sanity-client";
import { withSentry } from "@sentry/nextjs";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
};

export type ApiBody = {
  pageId: string;
  modules: any;
  changedModuleKey: string;
  replacesModuleKey: string;
  newModulesOrder: string[];
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: string;
}

const handler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (req.method !== "POST") return res.status(405).end();

  const {
    pageId,
    changedModuleKey,
    replacesModuleKey,
    newModulesOrder,
  }: ApiBody = JSON.parse(JSON.stringify(req.body));

  // https://nextjs.org/docs/advanced-features/preview-mode#works-with-api-routes
  if (!req.preview) {
    return res.status(400).json({ message: `Not in preview mode` });
  }

  if (!pageId) {
    return res.status(400).json({ message: `No page id` });
  }

  if (!changedModuleKey || !newModulesOrder) {
    return res.status(400).json({ message: `No modules to patch` });
  }

  const moduleData = await sanityClient.fetch(`
  *[_id == "${pageId}"] { 
    "module": modules[_key == "${changedModuleKey}"][0] 
  }[0].module`);

  if (!moduleData) {
    return res.status(400).json({ message: `Failed to fetch module data` });
  }

  const position =
    newModulesOrder.indexOf(changedModuleKey) >
    newModulesOrder.indexOf(replacesModuleKey)
      ? "before"
      : "after";

  console.log(changedModuleKey, position, replacesModuleKey);

  moduleData._key = nanoid();

  await sanityClient
    .patch(pageId)
    .unset([`modules[_key=="${changedModuleKey}"]`])
    .insert(position, `modules[_key=="${replacesModuleKey}"]`, [moduleData])
    .commit({
      autoGenerateArrayKeys: false,
    });

  return res
    .status(200)
    .json({ message: `Successfully patched modules for ${pageId}` });
};

export default withSentry(handler as any);
