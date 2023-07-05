import { richTextQuery } from "../portabletext/portabletext.query";

/**
 * Usage
 *
 * {
 *   ...,
 *   faq[] ${faqQuery}
 * }
 */
export const faqQuery = `
{
  _type == 'faq.reference' => @-> ,
  _type != 'reference' => @,
} {
  title,
  content[] ${richTextQuery}
}
`;
