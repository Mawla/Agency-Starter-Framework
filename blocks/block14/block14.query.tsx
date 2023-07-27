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
      "date": coalesce(^.publishedAt, ^._createdAt),
      body[] ${richTextQuery},
    }`;
