import { buttonQuery } from "../../components/buttons/button.query";
import { decorationsQuery } from "../../components/decorations/decoration.query";
import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock18Query = (language: LanguageType) => groq`
  _type == "block.block18" => {
    _key,
    _type,
    title,
    intro[] ${richTextQuery},
    buttons[] ${buttonQuery},
    items[] { 
      theme,
      ${decorationsQuery},
      "image": ${imageQuery},
      title,
      subtitle,
      content[] ${richTextQuery},
      buttons[] ${buttonQuery},
    },
  }`;
