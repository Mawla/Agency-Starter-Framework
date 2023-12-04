import { imageQuery } from "../images/image.query";
import { videoQuery } from "../video/video.query";
import groq from "groq";

export const decorationFieldsQuery = groq`
_key,
title,
breakout,
mobile {
  ...,
  "image": ${imageQuery},
  "video": ${videoQuery}
},
tablet {
  ...,
  "image": ${imageQuery},
  "video": ${videoQuery}
},
desktop {
  ...,
  "image": ${imageQuery},
  "video": ${videoQuery}
}
`;

export const decorationsQuery = groq`
decorations[] {
  _type,
  html,
  "image": ${imageQuery},
  "video": ${videoQuery},
  imageRepeat,
  css,
  "slug": slug.current,
  "location": coalesce(location, preset->location),
 ${decorationFieldsQuery},
 preset -> {
  ${decorationFieldsQuery}
 }
}`;
