import { LanguageType } from "../../languages";
import { buttonQuery } from "../../queries/components/button";
import { imageQuery } from "../../queries/components/image";
import { richTextQuery } from "../../queries/components/richText";
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
