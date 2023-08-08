import { imageQuery } from "../images/image.query";
import groq from "groq";

export const decorationFieldsQuery = groq`
_key,
title,
location,
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
 ${decorationFieldsQuery}
}`;
