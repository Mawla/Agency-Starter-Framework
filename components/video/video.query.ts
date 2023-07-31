import { getImageQuery } from "../images/image.query";
import groq from "groq";

export const videoQueryFields = groq`
  loop,
  autoPlay,
  caption,
  provider,
  frameless,
  "videoId": coalesce(mux.asset->playbackId, youtube, vimeo, url, sanity.asset->url),
  "poster": ${getImageQuery("poster")}
`;

export const videoQuery = groq`
  video { ${videoQueryFields} }
`;

export const videoSourceQuery = groq`
  {
    "loop": @.loop,
    "autoPlay": @.autoPlay,
    "caption": @.caption,
    "provider": @.provider,
    "frameless": @.frameless,
    "videoId": coalesce(mux.asset->playbackId, youtube, vimeo, url, sanity.asset->url),
  }
`;
