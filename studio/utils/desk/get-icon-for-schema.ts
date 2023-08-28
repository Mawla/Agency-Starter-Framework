import { getSchemas } from "../schemas/getSchemas";
import { ExclamationFile } from "@vectopus/atlas-icons-react";
import { StructureBuilder } from "sanity/desk";

export const getIconForSchema = (S: StructureBuilder, schemaName: string) => {
  const schemas = getSchemas(S);
  const icon = schemas.find(({ name }) => name === schemaName)?.icon;

  return (icon ? icon : ExclamationFile) as React.ComponentClass<any>;
};
