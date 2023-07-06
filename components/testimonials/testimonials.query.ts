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
  title,
  content[] ${richTextQuery}
}
`;
