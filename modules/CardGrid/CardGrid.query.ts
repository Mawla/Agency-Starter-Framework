import { LanguageType } from "../../languages";
import {
  buttonQuery,
  resolveIdHrefQuery,
} from "../../queries/components/button";
import { getImageQuery, imageQuery } from "../../queries/components/image";
import { richTextQuery } from "../../queries/components/richText";
import { getTranslationQuery } from "../../queries/components/translations";
import { COMPOSABLE_CARD_THEME_OPTIONS } from "./ComposableCardOptions";
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
  feed,
  "items": select(
    // department cards
    feed.type == 'department' => *[_type == 'page.department' && !(_id in path("drafts.**"))] {
      "type": 'card.composable',
      _id,
      "_key": _id,
      "themeName": "${COMPOSABLE_CARD_THEME_OPTIONS.department}",
      "title": title.${language},
      "text": description.${language},
      "image": ${imageQuery},
      "buttons": [{ 
        "label": ${getTranslationQuery("read_more", language)},
        "variant": 'secondary',
        "href": ${resolveIdHrefQuery}
      }]
    },

    // people cards
    feed.type == 'person' => *[_type == 'person' && !(_id in path("drafts.**"))] {
      "type": 'card.composable',
      _id,
      "_key": _id,
      "themeName": "${COMPOSABLE_CARD_THEME_OPTIONS.person}",
      "title": name,
      "subtitle": position.${language},
      "text": description.${language},
      "image": ${imageQuery},
    },

    // free form cards
    items[] {
      "type": _type,
      theme,
      _key,
      _type == "card.composable" => {
        "cover": ${getImageQuery("cover")},
        "image": ${imageQuery},
        icon,
        badge,
        title,
        subtitle,
        text[] ${richTextQuery},
        buttons[] ${buttonQuery},
      },
      _type == "card.image" => {
        "image": ${imageQuery},
      },
    }
  )
}`;
