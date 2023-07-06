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
export const testimonialsQuery = `
{
  _type == 'testimonials.reference' => @-> ,
  _type != 'reference' => @,
} {
  _key,
  name,
  jobTitle,
  title,
  content[] ${richTextQuery},
  "image": ${imageQuery},
}
`;
