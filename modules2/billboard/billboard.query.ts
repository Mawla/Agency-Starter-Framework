import { buttonQuery } from "../../components/buttons/button.query";
import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
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
