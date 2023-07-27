import { PageContext } from "../context/PageContext";
import { SiteContext } from "../context/SiteContext";
import { TranslationFieldType } from "../types";
import { useContext } from "react";

export const useTranslation = (
  key: TranslationFieldType,
  defaultValue = "",
) => {
  const { config } = useContext(SiteContext);
  const { language } = useContext(PageContext);
  const translations = config.translations;

  return translations?.[key]?.[language] || defaultValue;
};
