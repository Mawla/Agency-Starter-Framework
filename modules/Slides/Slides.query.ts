import { LanguageType } from "../../languages";
import { buttonQuery } from "../../queries/components/button";
import { imageQuery } from "../../queries/components/image";
import { richTextQuery } from "../../queries/components/richText";
import groq from "groq";

export const getSlidesQuery = (
  language: LanguageType
) => groq`_type == "module.slides" => {
  title,
  eyebrow,
  intro[] ${richTextQuery},
  buttons[] ${buttonQuery},
  items[] { 
    _key,
    title,
    label,
    text,
    "image": ${imageQuery}
  }
}`;
