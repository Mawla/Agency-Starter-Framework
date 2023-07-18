import { languages, LanguageType } from "../languages";
import { LINKABLE_SCHEMAS } from "../types.sanity";
import { documentList } from "./utils/desk/documentList";
import { getIconForSchema } from "./utils/desk/get-icon-for-schema";
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
  Gear,
  Layers,
  MagnifyingGlass,
  PapertrayLines,
  QuestionFile,
} from "@vectopus/atlas-icons-react";
import {
  DefaultDocumentNodeContext,
  StructureBuilder,
  DocumentBuilder,
  DocumentListBuilder,
  StructureResolverContext,
  Child,
  ListItemBuilder,
} from "sanity/desk";

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) =>
  S.list()
    .title("Website")
    .items([
      ...languages.map(
        (language): ListItemBuilder =>
          group(S, {
            title: language.title,
            icon: () => <Layers weight="thin" size={24} />,
          })
            .id(`${language.id}`)
            .child(
              list(S, { title: language.title }).items([
                S.listItem()
                  .title("All pages")
                  .icon(() => <Diagram weight="thin" size={20} />)
                  .child(
                    S.documentList()
                      .title("Content pages")
                      .schemaType("page.content")
                      .filter(
                        `_type in [${Object.keys(LINKABLE_SCHEMAS)
                          .map((schema) => `'${schema}'`)
                          .join(", ")}] && !defined(parent) && language == '${
                          language.id
                        }'`,
                      )
                      .child(
                        (id: string) =>
                          nestedContentPageList(
                            S,
                            id,
                            context,
                            language.id,
                          ) as any,
                      ),
                  ),

                S.divider(),

                singleton(S, {
                  id: `page_homepage`,
                  type: "page.home",
                  language: language.id,
                }),
                documentList(S, {
                  type: "page.content",
                  title: "Content pages",
                  language: language.id,
                }),
                documentList(S, {
                  type: "page.landing",
                  title: "Landing pages",
                  language: language.id,
                }),

                S.divider(),

                S.listItem()
                  .title("Blogs")
                  .icon(getIconForSchema(S, "page.blogs"))
                  .child(
                    list(S, { title: "Blogs" }).items([
                      singleton(S, {
                        id: `page_blogs`,
                        type: "page.blogs",
                        language: language.id,
                      }),
                      documentList(S, {
                        type: "page.blog",
                        title: "Blog articles",
                        language: language.id,
                      }),
                    ]),
                  ),

                S.listItem()
                  .title("Events")
                  .icon(getIconForSchema(S, "page.events"))
                  .child(
                    list(S, { title: "Events" }).items([
                      singleton(S, {
                        id: `page_events`,
                        type: "page.events",
                        language: language.id,
                      }),
                      documentList(S, {
                        type: "page.event",
                        title: "Events",
                        language: language.id,
                      }),
                    ]),
                  ),

                S.listItem()
                  .title("Case studies")
                  .icon(getIconForSchema(S, "page.casestudies"))
                  .child(
                    list(S, { title: "Case studies" }).items([
                      singleton(S, {
                        id: `page_casestudies`,
                        type: "page.casestudies",
                        language: language.id,
                      }),
                      documentList(S, {
                        type: "page.casestudy",
                        title: "Case studies",
                        language: language.id,
                      }),
                    ]),
                  ),

                S.listItem()
                  .title("Podcasts")
                  .icon(getIconForSchema(S, "page.podcasts"))
                  .child(
                    list(S, { title: "Podcasts" }).items([
                      singleton(S, {
                        id: `page_podcasts`,
                        type: "page.podcasts",
                        language: language.id,
                      }),
                      documentList(S, {
                        type: "page.podcast",
                        title: "Podcasts",
                        language: language.id,
                      }),
                    ]),
                  ),

                S.listItem()
                  .title("Guides")
                  .icon(getIconForSchema(S, "page.guides"))
                  .child(
                    list(S, { title: "Guides" }).items([
                      singleton(S, {
                        id: `page_guides`,
                        type: "page.guides",
                        language: language.id,
                      }),
                      documentList(S, {
                        type: "page.guide",
                        title: "Guides",
                        language: language.id,
                      }),
                    ]),
                  ),

                S.listItem()
                  .title("Tools")
                  .icon(getIconForSchema(S, "page.tools"))
                  .child(
                    list(S, { title: "Tools" }).items([
                      singleton(S, {
                        id: `page_tools`,
                        type: "page.tools",
                        language: language.id,
                      }),
                      documentList(S, {
                        type: "page.tool",
                        title: "Tools",
                        language: language.id,
                      }),
                    ]),
                  ),

                S.listItem()
                  .title("Videos")
                  .icon(getIconForSchema(S, "page.videos"))
                  .child(
                    list(S, { title: "Videos" }).items([
                      singleton(S, {
                        id: `page_videos`,
                        type: "page.videos",
                        language: language.id,
                      }),
                      documentList(S, {
                        type: "page.video",
                        title: "Videos",
                        language: language.id,
                      }),
                    ]),
                  ),

                S.divider(),
                documentList(S, {
                  type: "page.tag",
                  title: "Tags",
                  language: language.id,
                }),
                S.divider(),
                singleton(S, {
                  id: "navigation",
                  type: "navigation",
                  language: language.id,
                }),
                singleton(S, {
                  id: "footer",
                  type: "footer",
                  language: language.id,
                }),
                S.divider(),
                singleton(S, {
                  id: `page_notfound`,
                  type: "page.notfound",
                  language: language.id,
                }),
                singleton(S, {
                  id: `page_sitemap`,
                  type: "page.sitemap",
                  language: language.id,
                }),
              ]),
            ),
      ),

      group(S, {
        title: "Collections",
        icon: () => <PapertrayLines weight="thin" size={20} />,
      }).child(
        list(S, { title: "Collections" }).items([
          documentList(S, { type: "person", title: "People" }),
          documentList(S, {
            type: "faq.item",
            title: "Frequently Asked Questions",
          }),
          documentList(S, { type: "testimonials.item", title: "Testimonials" }),
        ]),
      ),
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
          singleton(S, { id: "config_theme", type: "config.theme" }),
          singleton(S, { id: "secret.config_cms", type: "config.cms" }),
        ]),
      ),
      documentList(S, { type: "redirect", title: "Redirects" }),
      documentList(S, { type: "script", title: "Scripts" }),
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
  if (schemaType.startsWith("page.") || schemaType === "script") {
    views.push(PreviewView(S));

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

export const PreviewView = (S: StructureBuilder) =>
  S.view
    .component(PreviewIframe)
    .title("Preview")
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
  language: LanguageType,
): Promise<StructureBuilder | DocumentListBuilder | DocumentBuilder | Child> {
  const client = context.getClient({
    apiVersion: "vX",
  });
  const page = await client.fetch(
    `*[_id == $id || _id == "drafts.${id}"][0] { "title": title, _id, _type }`,
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
        (
          $id == _id || "drafts.${id}" == _id ||
          $id == parent._ref || "drafts.${id}" == parent._ref ||
          $id == parent.parent._ref || "drafts.${id}" == parent.parent._ref ||
          $id == parent.parent.parent._ref || "drafts.${id}" == parent.parent.parent._ref ||
          $id == parent.parent.parent.parent._ref || "drafts.${id}" == parent.parent.parent.parent._ref
        ) && language == "${language}"
       `,
      )
      .params({ id })
      .child((id: string): DocumentBuilder => {
        if (id === page?._id || `drafts.${id}` === page?._id) {
          return defaultDocumentNode(S, {
            schemaType: page?._type,
          } as DefaultDocumentNodeContext).id(id);
        }
        return nestedContentPageList(S, id, context, language) as any;
      });
  }

  return defaultDocumentNode(S, {
    schemaType: page?._type,
  } as DefaultDocumentNodeContext).id(id);
}
