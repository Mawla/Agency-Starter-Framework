import { richTextQuery } from "../../components/PortableText/PortableText.query";
import { buttonQuery } from "../../components/buttons/Button.query";
import { imageQuery } from "../../components/images/Image.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBillboardQuery = (language: LanguageType) => groq`
_type == "module.billboard" => {
  _key,
  _type,
  eyebrow,
  title,
  content[] ${richTextQuery},
  "image": ${imageQuery},
  buttons[] ${buttonQuery}
}`;
