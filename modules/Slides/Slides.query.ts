import { richTextQuery } from "../../components/PortableText/PortableText.query";
import { buttonQuery } from "../../components/buttons/Button.query";
import { imageQuery } from "../../components/images/Image.query";
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
