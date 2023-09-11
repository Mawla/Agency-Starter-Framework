import { buttonQuery } from "../../components/buttons/button.query";
import { decorationsQuery } from "../../components/decorations/decoration.query";
import {
  imageQuery,
  imageSimpleQuery,
} from "../../components/images/image.query";
import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { getTestimonialFields } from "../../components/testimonials/testimonials.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getBlock18Query = (language: LanguageType) => groq`
  _type == "block.block18" => {
    _key,
    _type,
    title,
    intro[] ${richTextQuery},
    footer[] ${richTextQuery},
    buttons[] ${buttonQuery},
    items[] { 
      _key,
      "type": _type,
      theme,
      ${decorationsQuery},

      _type == "card.testimonial" => {
        ...coalesce(testimonialRef ->, testimonial) {
          ${getTestimonialFields()}
        }
      },
      
      _type == "card.composable" => {
        "image": ${imageQuery},
        title,
        subtitle,
        content[] ${richTextQuery},
        buttons[] ${buttonQuery},
      },
      
      _type == "card.image" => {
        "image": ${imageSimpleQuery},
      },
    },
  }`;
