import { withSentryOptional } from "../../../helpers/sentry/with-sentry-optional";
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

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { secret, _id, _type, language } = req.query;

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res
      .status(401)
      .send(
        warning(
          "The preview token is invalid. Make sure the Vercel environment variable is set correctly and matches the preview secret in the Sanity CMS config.",
        ),
      );
  }

  if (!secret || Array.isArray(secret) || !secret.trim().length)
    return res.status(400).send(warning("secret is missing."));

  if (!_id || !language || Array.isArray(_id) || Array.isArray(_type)) {
    return res.status(400).send(warning("invalid arguments."));
  }

  if (Array.isArray(language)) {
    return res.status(401).send(warning("Can not preview multiple languages."));
  }

  const draftId = _id.startsWith("drafts.") ? _id : `drafts.${_id}`;
  const Location = `/preview?id=${draftId}&type=${_type}&language=${language}`;
  res.setPreviewData({});
  res.writeHead(307, { Location });
  res.end();
};

export default withSentryOptional(handler);
