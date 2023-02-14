import { resolveIdHrefQuery } from "../../components/buttons/button.query";
import { imageQuery } from "../../components/images/image.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getFeedQuery = (
  language: LanguageType,
) => groq`_type == "module.resourcefeed" => {
  title,
  eyebrow,
  "tags": *[_type == 'page.tag' && language == "${language}"].title,
  "items": *[
    (
      _type in ^.filter.types 
      || !defined(^.filter.types)
      || count(^.filter.types) == 0
    )
    && (
      !defined(^.filter.tags)
      || count(^.filter.tags) == 0
      || count(tags[@._ref in ^.^.filter.tags[]._ref]) > 0 
    )
    && !(_id in path("drafts.*"))
    && language == "${language}"
  ] {
    _id,
    publishedAt,
    _createdAt,
    title,
    "href": ${resolveIdHrefQuery},
    "image": hero[0] { "image": ${imageQuery} }.image,
    "intro": coalesce(
      pt::text(hero[0].intro),
      pt::text(modules[_type == 'module.richtext'][0].content),
    ),
    "tags": tags[]->title,
    "authors": authors[]-> { 
      name, 
      "image": ${imageQuery} 
    },
    "date": coalesce(publishedAt, _createdAt),
  } | order(publishedAt desc, _createdAt desc)
}`;
