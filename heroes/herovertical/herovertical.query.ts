import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getHeroVerticalQuery = (
  language: LanguageType,
) => groq`_type == "hero.herovertical" => {
  title,
  eyebrow,
  text[] ${richTextQuery},
  "image": ${imageQuery}
}`;
