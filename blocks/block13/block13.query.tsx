import { resolveIdHrefQuery } from "../../components/buttons/button.query";
import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import { RESOURCE_SCHEMAS_LIST } from "../../types.sanity";
import groq from "groq";

export const getBlock13Query = (language: LanguageType) => {
  return groq`
    _type == "block.block13" => {
      _key,
      _type,
      title,
      intro[] ${richTextQuery},
      "items": *[
        _id != ^.^._id 
        &&
        (
          // get pages matching filtered types, e.g [page.blog, page.event]
          (
            _type in ^.filter.types 
            && 
            (
              defined(^.filter.types)
              || count(^.filter.types) > 0
            )
          )
          ||
          // get pages matching all taggable schemas if no types are defined
          (
            _type in ['${RESOURCE_SCHEMAS_LIST.join("','")}']
            && (
              !defined(^.filter.types)
              || count(^.filter.types) == 0
            )
          )
        )
        // filter by tags
        && (
          // get pages matching defined filter tags
          (
            (
              defined(^.filter.tags)
              && count(^.filter.tags) > 0
              && count(tags[@._ref in ^.^.filter.tags[]._ref]) > 0 
            ) 
            ||
            // get pages matching tags on the page
            (
              count(tags[@._ref in ^.^.^.tags[]._ref]) > 0 
              && (
                !defined(^.filter.tags)
                || count(^.filter.tags) == 0
              )
            )
            ||
            // default get all pages
            (
              (
                !defined(^.^.tags)
                || count(^.^.tags) == 0
              )
              && 
              (
                !defined(^.filter.tags)
                || count(^.filter.tags) == 0
              )
            )
          )
        )
        && !(_id in path("drafts.*"))
        && language == "${language}"
      ] {
        _id,
        publishedAt,
        _createdAt,
        title,
        "href": ${resolveIdHrefQuery},
        "image": select(
          defined(image) => ${imageQuery},
          defined(blocks[0].image) => blocks[0] { 
            "image": ${imageQuery} 
          }.image,
        ),
        "intro": coalesce(
          pt::text(blocks[0].intro),
          pt::text(blocks[_type == 'block.block14'][0].body),
        ),
        "date": coalesce(publishedAt, _createdAt),
        "matchedTags": coalesce(count(tags[@._ref in ^.^.^.tags[]._ref]), 0)
      } | order(matchedTags desc, publishedAt desc, _createdAt desc) [0...4]
    }`;
};
