import { resolveIdHrefQuery } from "../../components/buttons/button.query";
import { imageQuery } from "../../components/images/image.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getFeedQuery = (
  language: LanguageType,
) => groq`_type == "module.feed" => {
  title,
  eyebrow,
  "tags": *[_type == 'page.tag'] {
    "title": title.${language},
  }.title,
  "items": *[_type in ^.filter.types && !(_id in path("drafts.*"))] {
    _id,
    "title": title.${language},
    "href": ${resolveIdHrefQuery},
    "image": hero[language == '${language}'][0] { "image": ${imageQuery} }.image,
    "intro": coalesce(
      pt::text(heroes[0].content),
      pt::text(modules[_type == 'module.richtext'][0].content),
    ),
    "tags": tags[]->title.${language},
    "authors": authors[]-> { 
      name, 
      "image": ${imageQuery} 
    },
    "date": coalesce(publishedAt, _createdAt),
  } | order(publishedAt desc, _createdAt desc)
}`;
