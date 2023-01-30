import { LanguageType } from "../../languages";
import { buttonQuery } from "../../queries/components/button";
import { imageQuery } from "../../queries/components/image";
import { richTextQuery } from "../../queries/components/richText";
import groq from "groq";

export const getTextImageQuery = (
  language: LanguageType,
) => groq`_type == "module.textimage" => {
  title,
  eyebrow,
  intro[] ${richTextQuery},
  "image": ${imageQuery},
  buttons[] ${buttonQuery}
}`;
