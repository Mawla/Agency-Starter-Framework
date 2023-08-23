import { resolveIdHrefQuery } from "../../components/buttons/button.query";
import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock14Query = (language: LanguageType) => groq`
    _type == "block.block14" => {
      _key,
      _type,
      "title": ^.title,
      "tags": ^.tags[]-> { 
        title,
        "href": ${resolveIdHrefQuery},
      },
      "authors": ^.authors[]-> { 
        name, 
        "image": ${imageQuery} 
      },
      "startDate": ^.startDate,
      "endDate": ^.endDate,
      "date": coalesce(^.publishedAt, ^._createdAt),
      body[] ${richTextQuery},
      "relatedArticles": *[
        _id != ^.^._id 
        && _type == ^.^._type
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
        startDate,
        endDate,
        "matchedTags": coalesce(count(tags[@._ref in ^.^.^.tags[]._ref]), 0)
      }
      | order(matchedTags desc, startDate desc, publishedAt desc, _createdAt desc) [0...5]
    }`;
