import { languages, LanguagesListItemType } from "../languages";
import { DocumentIcon } from "./utils/DocumentIcon";
import { documentList } from "./utils/desk/documentList";
import { group } from "./utils/desk/group";
import { list } from "./utils/desk/list";
import { singleton } from "./utils/desk/singleton";
import { EmbedIframe } from "./views/EmbedIframe";
import { PreviewIframe } from "./views/PreviewIframe";
import { SeoPane } from "./views/SeoPane";
import { Sitemap } from "./views/Sitemap";
import {
  DefaultDocumentNodeContext,
  StructureBuilder,
  DocumentBuilder,
  DocumentListBuilder,
  StructureResolverContext,
  Child,
} from "sanity/desk";

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext
) =>
  S.list()
    .title("Website")
    .items([
      group(S, {
        title: "Pages",
        icon: () => <DocumentIcon type="studio" />,
      }).child(
        list(S, { title: "Pages" }).items([
          S.listItem()
            .title("All pages")
            .icon(() => <DocumentIcon type="structure" />)
            .child(
              S.documentList()
                .title("Content pages")
                .schemaType("page.content")
                .filter(
                  `_type in [
                    'page.content',
                    'page.home',
                    'page.pressrelease'
                  ] && !defined(parent)`
                )
                .child(
                  (id: string) => nestedContentPageList(S, id, context) as any
                )
            ),

          S.divider(),
          singleton(S, { id: "page_homepage", type: "page.home" }),
          documentList(S, { type: "page.content", title: "Content pages" }),

          S.divider(),
          documentList(S, {
            type: "page.pressrelease",
            title: "Press releases",
          }),
          S.divider(),
        ])
      ),
      group(S, {
        title: "Collections",
        icon: () => <DocumentIcon type="collections" />,
      }).child(
        list(S, { title: "Collections" }).items([
          documentList(S, { type: "person", title: "People" }),
        ])
      ),

      singleton(S, { id: "navigation", type: "navigation" }),
      singleton(S, { id: "footer", type: "footer" }),
      S.divider(),
      group(S, {
        title: "Config",
        icon: () => <DocumentIcon type="config" />,
      }).child(
        list(S, { title: "Config" }).items([
          singleton(S, { id: "config_general", type: "config.general" }),
          singleton(S, { id: "config_seo", type: "config.seo" }),
          singleton(S, { id: "config_social", type: "config.social" }),
          singleton(S, {
            id: "config_integrations",
            type: "config.integrations",
          }),
          singleton(S, {
            id: "config_translations",
            type: "config.translations",
          }),
        ])
      ),
      S.documentTypeListItem("page.preset").title("Presets"),
      documentList(S, { type: "redirect", title: "Redirects" }),
      S.divider(),
      singleton(S, { id: "page_notfound", type: "page.notfound" }),
      S.listItem()
        .title("Sitemap")
        .icon(() => <DocumentIcon type="sitemap" />)
        .child(
          S.component(Sitemap)
            .options({
              S: S,
            })
            .id("sitemap")
        ),
      S.divider(),
      S.listItem()
        .title("Guide")
        .icon(() => <DocumentIcon type="guide" />)
        .child(
          S.component(EmbedIframe)
            .options({
              embedLink: "https://hello-prima-cms-docs.super.site/",
            })

            .id("guides")
        ),
    ]);

export const defaultDocumentNode = (
  S: StructureBuilder,
  context: DefaultDocumentNodeContext
): DocumentBuilder => {
  const schemaType = context?.schemaType;

  // add preview iframe for pages
  const views: any[] = [S.view.form()];
  if (schemaType.startsWith("page.")) {
    languages.forEach((language) => {
      views.push(PreviewView(S, language));
    });

    if (schemaType !== "page.preset") {
      views.push(SeoView(S));
    }
  }

  return S.document().schemaType(schemaType).views(views);
};

export const PreviewView = (
  S: StructureBuilder,
  language: LanguagesListItemType
) =>
  S.view
    .component(PreviewIframe)
    .options({
      language: language.id,
    })
    .title("Preview " + language.title)
    .icon(() => <DocumentIcon type="preview" />);

export const SeoView = (S: StructureBuilder) =>
  S.view
    .component(SeoPane)
    .title("SEO")
    .icon(() => <DocumentIcon type="search" />);

/**
 * Group pages by parent
 */

async function nestedContentPageList(
  S: StructureBuilder,
  id: string,
  context: StructureResolverContext
): Promise<StructureBuilder | DocumentListBuilder | DocumentBuilder | Child> {
  const client = context.getClient({
    apiVersion: "vX",
  });
  const page = await client.fetch(
    `*[_id == $id || _id == "drafts.${id}"][0] { "title": title.en, _id, _type }`,
    { id }
  );

  const hasChildren = await client.fetch(
    `count(*[
     parent._ref == $id || 
     parent._ref == "drafts.${id}"
   ]) > 0`,
    { id }
  );

  if (hasChildren) {
    return S.documentList()
      .title(page?.title || "Pages")
      .schemaType(page?._type)
      .filter(
        `
       $id == _id || "drafts.${id}" == _id ||
       $id == parent._ref || "drafts.${id}" == parent._ref ||
       $id == parent.parent._ref || "drafts.${id}" == parent.parent._ref ||
       $id == parent.parent.parent._ref || "drafts.${id}" == parent.parent.parent._ref ||
       $id == parent.parent.parent.parent._ref || "drafts.${id}" == parent.parent.parent.parent._ref
       `
      )
      .params({ id })
      .child((id: string): DocumentBuilder => {
        if (id === page?._id || `drafts.${id}` === page?._id) {
          return defaultDocumentNode(S, {
            schemaType: page?._type,
          } as DefaultDocumentNodeContext);
        }
        return nestedContentPageList(S, id, context) as any;
      });
  }

  return defaultDocumentNode(S, {
    schemaType: page?._type,
  } as DefaultDocumentNodeContext).id(id);
}
