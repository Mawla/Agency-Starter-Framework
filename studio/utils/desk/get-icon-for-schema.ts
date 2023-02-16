import { getSchemas } from "../schemas/getSchemas";
import { StructureBuilder } from "sanity/desk";

export const getIconForSchema = (S: StructureBuilder, schemaName: string) => {
  const schemas = getSchemas(S);
  const icon = schemas.find(({ name }) => name === schemaName)?.icon;
  return icon;
};
