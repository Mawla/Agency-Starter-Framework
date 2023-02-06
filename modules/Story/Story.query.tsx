import { buttonQuery } from "../../components/buttons/Button.query";
import { getImageQuery, imageQuery } from "../../components/images/Image.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getStoryQuery = (
  language: LanguageType,
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
