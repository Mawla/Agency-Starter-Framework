import { buttonQuery } from "../../components/buttons/button.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { videoQuery } from "../../components/video/video.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock9Query = (language: LanguageType) => groq`
  _type == "block.block9" => {
    _key,
    _type,
    title,
    intro[] ${richTextQuery},
    buttons[] ${buttonQuery},
    ${videoQuery},
  }`;
