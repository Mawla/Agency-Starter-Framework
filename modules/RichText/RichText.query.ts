import { richTextQuery } from "../../components/PortableText/PortableText.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getRichTextQuery = (
  language: LanguageType,
) => groq`_type == "module.richtext" => {
  eyebrow,
  title,
  content[] ${richTextQuery}
}`;
