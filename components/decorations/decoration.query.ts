import { imageQuery } from "../images/image.query";
import groq from "groq";

export const decorationFieldsQuery = groq`
_key,
title,
breakout,
mobile {
  ...,
  "image": ${imageQuery},
},
tablet {
  ...,
  "image": ${imageQuery},
},
desktop {
  ...,
  "image": ${imageQuery},
}
`;

export const decorationsQuery = groq`
decorations[] {
  "location": coalesce(location, preset->location),
 ${decorationFieldsQuery},
 preset -> {
  ${decorationFieldsQuery}
 }
}`;
