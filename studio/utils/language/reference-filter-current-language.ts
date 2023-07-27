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

  return {
    filter: `
      _id != $id
      && language == $language
    `,
    params: {
      id: document._id,
      language,
    },
  };
};
