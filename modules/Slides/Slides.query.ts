import { buttonQuery } from "../../components/buttons/button.query";
import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getSlidesQuery = (
  language: LanguageType,
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
