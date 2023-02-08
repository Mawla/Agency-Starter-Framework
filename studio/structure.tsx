import { languages, LanguagesListItemType } from "../languages";
import { LINKABLE_SCHEMAS } from "../types.sanity";
import { documentList } from "./utils/desk/documentList";
import { group } from "./utils/desk/group";
import { list } from "./utils/desk/list";
import { singleton } from "./utils/desk/singleton";
import { EmbedIframe } from "./views/EmbedIframe";
import { PreviewIframe } from "./views/PreviewIframe";
import { SeoPane } from "./views/SeoPane";
import { Sitemap } from "./views/Sitemap";
import {
  Diagram,
  Eye,
  FilingCabinet,
  Gear,
  Layers,
  MagnifyingGlass,
  QuestionFile,
} from "@vectopus/atlas-icons-react";
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
  context: StructureResolverContext,
) =>
  S.list()
    .title("Website")
    .items([
      group(S, {
        title: "Pages",
        icon: () => <Diagram weight="thin" size={20} />,
      }).child(
        list(S, { title: "Pages" }).items([
          S.listItem()
            .title("All pages")
            .icon(() => <Layers weight="thin" size={20} />)
            .child(
              S.documentList()
                .title("Content pages")
                .schemaType("page.content")
                .filter(
                  `_type in [
                    ${Object.keys(LINKABLE_SCHEMAS)
                      .map((schema) => `'${schema}'`)
                      .join(", ")}
                  ] && !defined(parent)`,
                )
                .child(
                  (id: string) => nestedContentPageList(S, id, context) as any,
                ),
            ),

          S.divider(),

          singleton(S, { id: "page_homepage", type: "page.home" }),
          documentList(S, { type: "page.content", title: "Content pages" }),

          S.divider(),

          documentList(S, {
            type: "page.blog",
            title: "Blogs",
            filter: '_type == "page.blogs" || _type == "page.blog"',
          }),

          documentList(S, {
            type: "page.event",
            title: "Events",
            filter: '_type == "page.events" || _type == "page.event"',
          }),

          documentList(S, {
            type: "page.casestudy",
            title: "Case studies",
            filter: '_type == "page.casestudies" || _type == "page.casestudy"',
          }),

          documentList(S, {
            type: "page.podcast",
            title: "Podcasts",
            filter: '_type == "page.podcasts" || _type == "page.podcast"',
          }),

          documentList(S, {
            type: "page.guide",
            title: "Guides",
            filter: '_type == "page.guides" || _type == "page.guide"',
          }),

          documentList(S, {
            type: "page.tool",
            title: "Tools",
            filter: '_type == "page.tools" || _type == "page.tool"',
          }),

          documentList(S, {
            type: "page.video",
            title: "Videos",
            filter: '_type == "page.videos" || _type == "page.video"',
          }),

          S.divider(),
        ]),
      ),
      group(S, {
        title: "Collections",
        icon: () => <FilingCabinet weight="thin" size={20} />,
      }).child(
        list(S, { title: "Collections" }).items([
          documentList(S, { type: "person", title: "People" }),
        ]),
      ),
      S.divider(),
      singleton(S, { id: "navigation", type: "navigation" }),
      singleton(S, { id: "footer", type: "footer" }),
      S.divider(),
      group(S, {
        title: "Config",
        icon: () => <Gear weight="thin" size={20} />,
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
        ]),
      ),
      documentList(S, { type: "redirect", title: "Redirects" }),
      documentList(S, { type: "form.static", title: "Forms" }),
      S.divider(),
      singleton(S, { id: "page_notfound", type: "page.notfound" }),
      singleton(S, { id: "page_sitemap", type: "page.sitemap" }),
      S.divider(),
      S.documentTypeListItem("page.preset").title("Presets"),

      S.divider(),
      S.listItem()
        .title("Guide")
        .icon(() => <QuestionFile weight="thin" size={20} />)
        .child(
          S.component(EmbedIframe)
            .options({
              embedLink: "https://mawla-cms-docs.super.site/",
            })

            .id("guides"),
        ),
    ]);

export const defaultDocumentNode = (
  S: StructureBuilder,
  context: DefaultDocumentNodeContext,
): DocumentBuilder => {
  const schemaType = context?.schemaType;

  // add preview iframe for pages
  const views: any[] = [S.view.form()];
  if (schemaType.startsWith("page.")) {
    languages.forEach((language) => {
      views.push(PreviewView(S, language));
    });

    if (
      schemaType.startsWith("page.") &&
      !["page.preset", "page.notfound", "page.sitemap"].includes(schemaType)
    ) {
      views.push(SeoView(S));
    }

    if (schemaType === "page.sitemap") {
      views.push(S.view.component(Sitemap).title("Sitemap"));
    }
  }

  return S.document().schemaType(schemaType).views(views);
};

export const PreviewView = (
  S: StructureBuilder,
  language: LanguagesListItemType,
) =>
  S.view
    .component(PreviewIframe)
    .options({
      language: language.id,
    })
    .title("Preview " + language.title)
    .icon(() => <Eye weight="thin" size={16} />);

export const SeoView = (S: StructureBuilder) =>
  S.view
    .component(SeoPane)
    .title("SEO")
    .icon(() => <MagnifyingGlass weight="thin" size={16} />);

/**
 * Group pages by parent
 */

async function nestedContentPageList(
  S: StructureBuilder,
  id: string,
  context: StructureResolverContext,
): Promise<StructureBuilder | DocumentListBuilder | DocumentBuilder | Child> {
  const client = context.getClient({
    apiVersion: "vX",
  });
  const page = await client.fetch(
    `*[_id == $id || _id == "drafts.${id}"][0] { "title": title.en, _id, _type }`,
    { id },
  );

  const hasChildren = await client.fetch(
    `count(*[
     parent._ref == $id || 
     parent._ref == "drafts.${id}"
   ]) > 0`,
    { id },
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
       `,
      )
      .params({ id })
      .child((id: string): DocumentBuilder => {
        if (id === page?._id || `drafts.${id}` === page?._id) {
          return defaultDocumentNode(S, {
            schemaType: page?._type,
          } as DefaultDocumentNodeContext).id(id);
        }
        return nestedContentPageList(S, id, context) as any;
      });
  }

  return defaultDocumentNode(S, {
    schemaType: page?._type,
  } as DefaultDocumentNodeContext).id(id);
}
