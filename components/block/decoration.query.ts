import { imageQuery } from "../images/image.query";
import groq from "groq";

export const decorationsQuery = groq`
decorations[] {
  _key,
  title,
  position,
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
}`;
