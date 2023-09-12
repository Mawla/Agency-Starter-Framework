import { buttonHrefQuery, buttonQuery } from "../buttons/button.query";
import { imageSourceQuery } from "../images/image.query";
import { getTestimonialQuery } from "../testimonials/testimonials.query";
import { videoSourceQuery } from "../video/video.query";
import groq from "groq";

export const richTextImage = `
_type == "image.simple" => {
  ...,
  "image": ${imageSourceQuery},
}`;

export const richTextVideo = `
_type == "video" => {
  "video": ${videoSourceQuery}
}`;

export const richTextButtons = `
_type == "buttons" => {
  "direction": direction,
  "items": items[] ${buttonQuery}
}`;

export const richTextCSV = `
_type == "csv" => {
  "file": file.asset->url,
  "fileName": file.asset->originalFilename,
}`;

export const richtextScript = `
_type == "scriptRef" => {
  ...script-> {
    title,
    items[]
  }
}`;

export const richTextMarkDefs = `
markDefs[]{
  ...,
  _type == "link" => {
    "href": ${buttonHrefQuery},
    target
  }
}`;

export const richTextPlainQuery = groq`
{
  ...,
  ${richTextMarkDefs}
}
`;

export const richtextTestimonials = `
_type == "testimonials" => {
  items[] ${getTestimonialQuery()}
}`;

export const richTextQueryFields = groq`
  ...,
  ${richTextImage},
  ${richTextVideo},
  ${richTextButtons},
  ${richTextCSV},
  ${richTextMarkDefs},
  ${richtextScript},
  ${richtextTestimonials},
 `;

export const richTextQuery = groq`
{
  ${richTextQueryFields}
}
`;
