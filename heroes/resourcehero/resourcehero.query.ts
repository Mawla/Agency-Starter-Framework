import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getResourceHeroQuery = (
  language: LanguageType,
) => groq`_type == "hero.resourcehero" => {
  title,
  eyebrow,
  intro[] ${richTextQuery},
  "image": ${imageQuery},
  "tags": ^.tags[]->title.${language},
  "authors": ^.authors[]->{ 
    name, 
    "image": ${imageQuery} 
  },
  "date": coalesce(^.publishedAt, ^._createdAt)
}`;
