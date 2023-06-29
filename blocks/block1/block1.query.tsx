import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock1Query = (language: LanguageType) => groq`
  _type == "block.block1" => {
    _key,
    _type,
    title,
    intro[] ${richTextQuery},
    features[] ${richTextQuery},
    "image": ${imageQuery},
  }`;
