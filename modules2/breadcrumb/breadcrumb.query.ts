import { LanguageType } from "../../languages";
import groq from "groq";

export const getBreadcrumbModuleQuery = (language: LanguageType) =>
  groq`_type == "module.breadcrumb" => {}`;
