import { resolveIdHrefQuery } from "../../components/buttons/button.query";
import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getResourceHeroQuery = (
  language: LanguageType,
) => groq`_type == "hero.resourcehero" => {
  title,
  intro[] ${richTextQuery},
  "image": ${imageQuery},
  "tags": ^.tags[]->{
    "title": title.${language},
    "href": ${resolveIdHrefQuery}
  },
  "authors": ^.authors[]->{ 
    name, 
    "image": ${imageQuery} 
  },
  "date": coalesce(^.publishedAt, ^._createdAt)
}`;
