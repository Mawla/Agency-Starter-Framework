import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getImageQuery = (
  language: LanguageType,
) => groq`_type == "module.image" => {
  title,
  eyebrow,
  intro[] ${richTextQuery},
  "image": ${imageQuery}
}`;
