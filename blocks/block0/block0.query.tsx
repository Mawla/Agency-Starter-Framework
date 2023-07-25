import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock0Query = (language: LanguageType) => groq`
  _type == "block.block0" => {
    _key,
    _type,
    bodyHTML,
    headHTML,
    baseURL,
    tailwindConfig
  }`;
