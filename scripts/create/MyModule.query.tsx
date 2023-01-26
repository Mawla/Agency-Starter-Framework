import { LanguageType } from "../../languages";
import groq from "groq";

/*IMPORT*/

export const getMyModuleQuery = (
  language: LanguageType
) => groq`_type == "MyModuleSchema" => {
  /*FIELDS*/
}`;
