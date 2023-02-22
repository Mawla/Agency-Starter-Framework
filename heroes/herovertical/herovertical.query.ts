import { buttonQuery } from "../../components/buttons/button.query";
import { getImageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getHeroVerticalQuery = (
  language: LanguageType,
) => groq`_type == "hero.herovertical" => {
  title,
  eyebrow,
  "image": ${getImageQuery("image")},
  text[] ${richTextQuery},
  buttons[] ${buttonQuery},
}`;
