import { richTextQuery } from "../../components/PortableText/PortableText.query";
import { buttonQuery } from "../../components/buttons/Button.query";
import { getImageQuery } from "../../components/images/Image.query";
import { LanguageType } from "../../languages";
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
