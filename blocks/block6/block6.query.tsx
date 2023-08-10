import { buttonQuery } from "../../components/buttons/button.query";
import { imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock6Query = (language: LanguageType) => groq`
    _type == "block.block6" => {
      _key,
      _type,
      title,
      intro[] ${richTextQuery},
      buttons[] ${buttonQuery},
      items[] { 
        _key, 
        title,
        intro[] ${richTextQuery},
        "image": ${imageQuery},
        theme,
        buttons[] ${buttonQuery},
      },
    }`;
