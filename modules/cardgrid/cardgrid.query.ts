import { buttonQuery } from "../../components/buttons/button.query";
import { getImageQuery, imageQuery } from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getCardGridQuery = (language: LanguageType) => groq`
_type == "module.cardgrid" => {
  _key,
  _type,
  theme,
  eyebrow,
  title,
  intro[] ${richTextQuery},
  slider,
  gap,
  columns,
  buttons[] ${buttonQuery},
  items[] {
    "type": _type,
    theme,
    _key,
    _type == "card.composable" => {
      "cover": ${getImageQuery("cover")},
      "image": ${imageQuery},
      icon,
      title,
      subtitle,
      text[] ${richTextQuery},
      buttons[] ${buttonQuery},
    },
    _type == "card.image" => {
      "image": ${imageQuery},
    },
  }
}`;
