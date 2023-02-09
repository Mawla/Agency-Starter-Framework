import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getFaqQuery = (
  language: LanguageType,
) => groq`_type == "module.faq" => {
  title,
  eyebrow,
  intro[] ${richTextQuery},
  items
}`;
