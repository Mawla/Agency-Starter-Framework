import { LanguageType } from "../../../languages";
import { SchemaName } from "../../../types.sanity";
import { defaultDocumentNode } from "../../structure";
import { getDocumentIcon } from "../document/getDocumentIcon";
import { getDocumentTitle } from "../document/getDocumentTitle";
import { DefaultDocumentNodeContext, StructureBuilder } from "sanity/desk";

type SingletonProps = {
  id: string;
  type: SchemaName;
  icon?: JSX.Element | any;
  title?: string;
  language?: LanguageType;
};

export function singleton(
  S: StructureBuilder,
  { id, type, title, icon, language }: SingletonProps,
) {
  return S.listItem()
    .title(title || getDocumentTitle(S, type))
    .icon(icon || (getDocumentIcon(S, type) as any))
    .id(language ? `${id}__i18n_${language}` : id)
    .child(
      defaultDocumentNode(S, {
        schemaType: type,
      } as DefaultDocumentNodeContext),
    );
}
