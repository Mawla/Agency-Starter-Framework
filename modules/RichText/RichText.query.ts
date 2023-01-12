import { LanguageType } from "../../languages";
import { richTextQuery } from "../../queries/components/richText";
import groq from "groq";

export const getRichTextQuery = (
  language: LanguageType
) => groq`_type == "module.richtext" => {
  eyebrow,
  title,
  content[] ${richTextQuery}
}`;
