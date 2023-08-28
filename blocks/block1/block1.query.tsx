import { buttonQuery } from "../../components/buttons/button.query";
import { getImageQuery, imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { videoQuery } from "../../components/video/video.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock1Query = (language: LanguageType) => groq`
  _type == "block.block1" => {
    _key,
    _type,
    title,
    intro[] ${richTextQuery},
    body[] ${richTextQuery},
    footer[] ${richTextQuery},
    "image": ${imageQuery},
    "mobileImage": ${getImageQuery("mobileImage")},
    "video": ${videoQuery},
    script -> {
      title,
      items[]
    },
    buttons[] ${buttonQuery},
  }`;
