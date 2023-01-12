import { SchemaName } from "../../../types.sanity";
import { getSchemas } from "./getSchemas";
import { StructureBuilder } from "sanity/desk";

export const isSingleton = (S: StructureBuilder, type: SchemaName): boolean => {
  return Boolean(getSchemas(S).find(({ name }) => name === type)?.singleton);
};
