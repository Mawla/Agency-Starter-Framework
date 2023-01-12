import { SchemaName } from "../../../types.sanity";
import { getDocumentIcon } from "../document/getDocumentIcon";
import { getDocumentTitle } from "../document/getDocumentTitle";
import { StructureBuilder } from "sanity/desk";

type GroupProps = {
  type?: SchemaName;
  title?: string;
  icon?: JSX.Element | any;
};

export function group(S: StructureBuilder, { type, title, icon }: GroupProps) {
  return S.listItem()
    .title(title || getDocumentTitle(S, type || null))
    .icon(icon || getDocumentIcon(S, type || null));
}
