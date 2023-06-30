import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock8Query = (language: LanguageType) => groq`
    _type == "block.block8" => {
      _key,
      _type,
      title,
      intro[] ${richTextQuery},
      items[] { _key, title },
    }`;
