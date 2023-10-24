import { LanguageType } from "../../../languages";
import { SANITY_API_VERSION, SchemaName } from "../../../types.sanity";
import { getDocumentIcon } from "../document/getDocumentIcon";
import { getDocumentTitle } from "../document/getDocumentTitle";
import { StructureBuilder } from "sanity/desk";

type DocumentListProps = {
  type: SchemaName;
  title?: string;
  filter?: string;
  icon?: JSX.Element | any;
  createMenuTypes?: SchemaName[];
  language?: LanguageType;
};

export function documentList(
  S: StructureBuilder,
  { type, title, filter, icon, createMenuTypes, language }: DocumentListProps,
) {
  return S.listItem()
    .title(title || getDocumentTitle(S, type))
    .icon(icon || (getDocumentIcon(S, type) as any))
    .child(() => {
      const list = S.documentList()
        .apiVersion(SANITY_API_VERSION)
        .title(title || getDocumentTitle(S, type))
        .filter(
          filter || language
            ? `_type == "${type}" && language == "${language}"`
            : `_type == "${type}"`,
        )
        .menuItems([...(S.documentTypeList(type).getMenuItems() as [])])
        .initialValueTemplates([
          ...((createMenuTypes || [type]).map((type) =>
            S.initialValueTemplateItem(`${type}-with-language`, { language }),
          ) as any),
        ]);

      // lists with a filter lose their desk structure position when creating a new item
      // this is very annoying, but I haven't been able to find a fix yet
      // so for now for lists with a filter (e.g both page.blog and page.blogs)
      // lose desk position, and lists without a filter (e.g only page.blog)
      //
      // studio › pages › blog › create new == lost desk position
      // studio › pages › content page › create new == desk stays intact
      //
      // setting the schemaType(type) for this list sort of fixes it, but
      // gives an error when editing a document that is of the other type specified in the filter
      // e.g page.blog editing works, but page.blogs errors out
      //
      // there must be a fix for this though
      if (filter) {
        return list;
      }

      // this keeps the document position in the desk intact
      // but only works with lists with a single schematype

      return list.canHandleIntent(
        S.documentTypeList(type).getCanHandleIntent() as any,
      );
    });
}
