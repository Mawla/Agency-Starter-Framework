import { richTextQuery } from "../../components/PortableText/PortableText.query";
import { buttonQuery } from "../../components/buttons/Button.query";
import { imageQuery } from "../../components/images/Image.query";
import { LanguageType } from "../../languages";
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
