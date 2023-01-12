import { SchemaName } from "../../../types.sanity";
import { getSchemas } from "../schemas/getSchemas";
import { StructureBuilder } from "sanity/desk";

export const getDocumentIcon = (
  S: StructureBuilder,
  schemaType: SchemaName | null
): JSX.Element | null => {
  if (!schemaType) return null;
  return (
    (getSchemas(S).find(({ name }) => schemaType === name)
      ?.icon as JSX.Element) || null
  );
};
