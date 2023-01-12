import { LanguageType } from "../../languages";
import { buttonQuery } from "../../queries/components/button";
import { getImageQuery, imageQuery } from "../../queries/components/image";
import groq from "groq";

export const getStoryQuery = (
  language: LanguageType
) => groq`_type == "module.story" => {
    label,
    quote,
    text,
    person-> {
      "name": name.${language},
      "position": position.${language},
    },
    "image": ${imageQuery},
    "backgroundImage": ${getImageQuery("backgroundImage")},
    "videoLink": videoLink ${buttonQuery}.href,
  }`;
