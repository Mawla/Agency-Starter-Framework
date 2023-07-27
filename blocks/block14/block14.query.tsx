import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock14Query = (language: LanguageType) => groq`
    _type == "block.block14" => {
      _key,
      _type,
      title,
      body[] ${richTextQuery},
    }`;
