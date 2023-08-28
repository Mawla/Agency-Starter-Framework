import { buttonQuery } from "../../components/buttons/button.query";
import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { videoQuery } from "../../components/video/video.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock4Query = (language: LanguageType) => groq`
    _type == "block.block4" => {
      _key,
      _type,
      title,
      subtitle,
      intro[] ${richTextQuery},
      body[] ${richTextQuery},
      "image": ${imageQuery},
      buttons[] ${buttonQuery},
      ${videoQuery},
    }`;
