import { SchemaName } from "../../../types.sanity";
import { defaultDocumentNode } from "../../structure";
import { getDocumentIcon } from "../document/getDocumentIcon";
import { getDocumentTitle } from "../document/getDocumentTitle";
import { DefaultDocumentNodeContext, StructureBuilder } from "sanity/desk";

type SingletonProps = {
  id: string;
  type: SchemaName;
  icon?: JSX.Element;
  title?: string;
};

export function singleton(
  S: StructureBuilder,
  { id, type, title, icon }: SingletonProps
) {
  return S.listItem()
    .title(title || getDocumentTitle(S, type))
    .icon(icon || (getDocumentIcon(S, type) as any))
    .id(id)
    .child(
      defaultDocumentNode(S, { schemaType: type } as DefaultDocumentNodeContext)
    );
}
