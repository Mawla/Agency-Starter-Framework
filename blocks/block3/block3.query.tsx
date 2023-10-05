import { buttonQuery } from "../../components/buttons/button.query";
import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock3Query = (language: LanguageType) => groq`
    _type == "block.block3" => {
      _key,
      _type,
      title,
      intro[] ${richTextQuery},
      "plans": *[_type == "pricing.plan" && language == "${language}"] {
        _id,
        _type,
        title,
        description,
        price {
          amount, unit
        },
        features[] ${richTextQuery},
        buttons[] ${buttonQuery},
        "image": ${imageQuery},
        orderRank
      } | order(orderRank asc)
    }`;
