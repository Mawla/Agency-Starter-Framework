import { LanguageType } from "../../languages";
import { buttonQuery } from "../../queries/components/button";
import { getImageQuery } from "../../queries/components/image";
import { richTextQuery } from "../../queries/components/richText";
import groq from "groq";

export const getHeroBasicQuery = (
  language: LanguageType,
) => groq`_type == "hero.basic" => {
  title,
  eyebrow,
  "image": ${getImageQuery("image")},
  text[] ${richTextQuery},
  buttons[] ${buttonQuery},
}`;
