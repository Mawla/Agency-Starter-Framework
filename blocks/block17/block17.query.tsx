import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock17Query = (language: LanguageType) => groq`
    _type == "block.block17" => {
      _key,
      _type,
      title,
    }`;
