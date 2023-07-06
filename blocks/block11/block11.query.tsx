import { buttonQuery } from "../../components/buttons/button.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { testimonialsQuery } from "../../components/testimonials/testimonials.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock11Query = (language: LanguageType) => groq`
  _type == "block.block11" => {
    _key,
    _type,
    title,
    intro[] ${richTextQuery},
    buttons[] ${buttonQuery},
    testimonials[] ${testimonialsQuery}
  }`;
