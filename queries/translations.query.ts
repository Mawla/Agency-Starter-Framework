import { LanguageType } from "../languages";
import { TranslationFieldType } from "../types";
import groq from "groq";

export const getTranslationQuery = (
  key: TranslationFieldType,
  language: LanguageType,
) =>
  groq` *[_type == 'config.translations'][0] { "value": ${key}.${language} }.value`;
