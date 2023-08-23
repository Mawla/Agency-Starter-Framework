import { imageQuery } from "../images/image.query";
import { richTextPlainQuery } from "../portabletext/portabletext.query";

/**
 * Usage
 *
 * {
 *   ...,
 *   testimonials[] ${testimonialsQuery}
 * }
 */

export const getTestimonialFields = () => `
_key,
name,
"jobTitle": jobTitle,
"title": title,
"content": content[] ${richTextPlainQuery},
"image": ${imageQuery},
`;

export const getTestimonialQuery = () => `
{
  _type == 'testimonials.reference' => @-> ,
  _type != 'reference' => @ 
} {
  ${getTestimonialFields()}
}
`;
