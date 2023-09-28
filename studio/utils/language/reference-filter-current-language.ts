import { baseLanguage } from "../../../languages";
import { getStructurePath } from "../../utils/desk/get-structure-path";
import { SanityDocument } from "sanity";

export const referenceFilterCurrentLanguage = ({
  document,
}: {
  document: SanityDocument;
}) => {
  const { language = baseLanguage } = getStructurePath();
  if (!document._id) return {};

  // return documents
  //   that are not the current document

  //  and when they are not pages
  //   are either not localized
  //   or are localized to the current language

  return {
    filter: `
      _id != $id
      && (
        (
          !defined(language) 
          && !(_type match "page.*")
        )
        || language == $language
      )
    `,
    params: {
      id: document._id,
      language,
    },
  };
};
