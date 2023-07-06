import { LanguageType } from "../../languages";
import { richTextQuery } from "../portabletext/portabletext.query";

/**
 * Usage
 *
 * {
 *   ...,
 *   faq[] ${faqQuery}
 * }
 */
export const getFaqQuery = (language: LanguageType) => `
{
  _type == 'faq.reference' => @-> ,
  _type != 'reference' => @,
} {
  "title": coalesce(title.${language}, title),
  "content": coalesce(content.${language}, content)[] ${richTextQuery},
}
`;
