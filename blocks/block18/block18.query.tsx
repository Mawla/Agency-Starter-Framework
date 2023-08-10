import { buttonQuery } from "../../components/buttons/button.query";
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
      items[] { _key, title },
    }`;
