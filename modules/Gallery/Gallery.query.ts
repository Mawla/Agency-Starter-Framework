import { richTextQuery } from "../../components/PortableText/PortableText.query";
import { imageQuery } from "../../components/images/Image.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getGalleryQuery = (
  language: LanguageType,
) => groq`_type == "module.gallery" => {
  title,
  eyebrow,
  intro[] ${richTextQuery},
  items[] { 
    _key,
    "image": ${imageQuery}
  }
}`;
