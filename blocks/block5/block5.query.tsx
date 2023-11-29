import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock5Query = (language: LanguageType) => groq`
    _type == "block.block5" => {
      _key,
      _type,
      title,
      intro[] ${richTextQuery},
      "features": *[_type == "pricing.feature" && language == "${language}"] {
        _id,
        title,
        "csv": coalesce(csv, file.asset->url),
        orderRank
      } | order(orderRank asc)
    }`;
