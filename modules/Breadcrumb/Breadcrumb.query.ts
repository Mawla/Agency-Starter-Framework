import { LanguageType } from "../../languages";
import groq from "groq";

export const getBreadcrumbQuery = (language: LanguageType) =>
  groq`_type == "module.breadcrumb" => {}`;
