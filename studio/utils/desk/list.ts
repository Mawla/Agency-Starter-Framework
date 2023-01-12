import { SchemaName } from "../../../types.sanity";
import { getDocumentTitle } from "../document/getDocumentTitle";
import { StructureBuilder } from "sanity/desk";

type ListProps = { type?: SchemaName; title?: string };

export function list(S: StructureBuilder, { type, title }: ListProps) {
  return S.list().title(title || getDocumentTitle(S, type || null));
}
