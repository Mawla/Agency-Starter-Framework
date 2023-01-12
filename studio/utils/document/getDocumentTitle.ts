import { SchemaName } from "../../../types.sanity";
import { getSchemas } from "../schemas/getSchemas";
import { StructureBuilder } from "sanity/desk";

export const getDocumentTitle = (
  S: StructureBuilder,
  schemaType: SchemaName | null
): string => {
  if (!schemaType) return "Untitled";
  return (
    getSchemas(S).find(({ name }) => schemaType === name)?.title || schemaType
  );
};
