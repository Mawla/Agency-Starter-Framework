import { LanguageType } from "../../languages";
import { imageQuery } from "../images/image.query";
import { richTextQuery } from "../portabletext/portabletext.query";

/**
 * Usage
 *
 * {
 *   ...,
 *   testimonials[] ${testimonialsQuery}
 * }
 */

export const getTestimonialQuery = (language: LanguageType) => `
{
  _type == 'testimonials.reference' => @-> ,
  _type != 'reference' => @ 
} {
  name,
  "jobTitle": coalesce(jobTitle.${language}, jobTitle),
  "title": coalesce(title.${language}, title),
  "content": coalesce(content.${language}, content)[] ${richTextQuery},
  "image": ${imageQuery},
}
`;
