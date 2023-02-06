import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
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
