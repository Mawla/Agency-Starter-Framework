import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getRichTextQuery = (
  language: LanguageType,
) => groq`_type == "module.richtext" => {
  eyebrow,
  title,
  content[] ${richTextQuery}
}`;
