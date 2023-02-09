import { richTextQuery } from "../../components/portabletext/portabletext.query";
import { videoQuery } from "../../components/video/video.query";
import { LanguageType } from "../../languages";
import groq from "groq";

export const getVideoQuery = (
  language: LanguageType,
) => groq`_type == "module.video" => {
  title,
  eyebrow,
  "video": ${videoQuery},
  intro[] ${richTextQuery}
}`;
