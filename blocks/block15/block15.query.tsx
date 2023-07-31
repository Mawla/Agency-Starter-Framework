import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock15Query = (language: LanguageType) => groq`
    _type == "block.block15" => {
      _key,
      _type,
      title,
      intro[] ${richTextQuery},
      body[] ${richTextQuery},
    }`;
