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
  visual {
    "image1": ${getImageQuery("image1")},
    "image2": ${getImageQuery("image2")},
    colors
  },
  showLozenges,
  breakOutImage,
  text[] ${richTextQuery},
  buttons[] ${buttonQuery},
}`;
