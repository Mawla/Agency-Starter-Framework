import { buttonQuery } from "../../components/buttons/button.query";
import { getFaqQuery } from "../../components/faq/faq.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock10Query = (language: LanguageType) => groq`
  _type == "block.block10" => {
    _key,
    _type,
    title,
    intro[] ${richTextQuery},
    buttons[] ${buttonQuery},
    faq[] ${getFaqQuery(language)}
  }`;
