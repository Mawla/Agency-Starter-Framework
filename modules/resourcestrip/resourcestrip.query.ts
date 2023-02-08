import { resolveIdHrefQuery } from "../../components/buttons/button.query";
import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getResourceStripQuery = (
  language: LanguageType,
) => groq`_type == "module.resourcestrip" => {
  title,
  eyebrow,
  intro[] ${richTextQuery},
  "items": *[
    _id != ^.^._id 
    && _type == ^.^._type 
    && count(tags[@._ref in ^.^.^.tags[]._ref]) > 0 
    && !(_id in path("drafts.*"))
  ] {
    _id,
    publishedAt,
    _createdAt,
    "title": title.${language},
    "href": ${resolveIdHrefQuery},
    "image": hero[language == '${language}'][0] { "image": ${imageQuery} }.image,
    "date": coalesce(publishedAt, _createdAt),
  }[0...3] | order(publishedAt desc, _createdAt desc)

}`;
