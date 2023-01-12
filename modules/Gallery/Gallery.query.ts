import { LanguageType } from "../../languages";
import { imageQuery } from "../../queries/components/image";
import { richTextQuery } from "../../queries/components/richText";
import groq from "groq";

export const getGalleryQuery = (
  language: LanguageType
) => groq`_type == "module.gallery" => {
  title,
  eyebrow,
  intro[] ${richTextQuery},
  items[] { 
    _key,
    "image": ${imageQuery}
  }
}`;
