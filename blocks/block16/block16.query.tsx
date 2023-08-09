import { buttonQuery } from "../../components/buttons/button.query";
import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock16Query = (language: LanguageType) => groq`
_type == "block.block16" => {
  _key,
  _type,
  title,
  intro[] ${richTextQuery},
  buttons[] ${buttonQuery},
  items[] {
    _key,
    title,
    "image": ${imageQuery}
  }
}`;
