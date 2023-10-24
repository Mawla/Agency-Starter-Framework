import { languages, LanguageType } from "../languages";
import { LINKABLE_SCHEMAS, SANITY_API_VERSION } from "../types.sanity";
import { cleanDesk } from "./utils/desk/clean-desk";
import { documentList } from "./utils/desk/documentList";
import { getIconForSchema } from "./utils/desk/get-icon-for-schema";
import { group } from "./utils/desk/group";
import { list } from "./utils/desk/list";
import { singleton } from "./utils/desk/singleton";
import { EmbedIframe } from "./views/EmbedIframe";
import { PreviewIframe } from "./views/PreviewIframe";
import { SeoPane } from "./views/SeoPane";
import { Sitemap } from "./views/Sitemap";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  BlueprintPaper,
  Diagram,
  Eye,
  FolderQuestion,
  Gear,
  Layers,
  MagnifyingGlass,
  MenuSquare,
  MessagingLines,
  PapertrayLines,
  QuestionFile,
  TriangleExclamation,
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

export const structure = async (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  let structure = S.list()
    .title("Website")
    .items([
      ...languages.map(
        (language): ListItemBuilder =>
          group(S, {
            title: languages.length <= 1 ? "Pages" : language.title,
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
                      .apiVersion(SANITY_API_VERSION)
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
                singleton(S, {
                  id: "page_pricing",
                  type: "page.pricing",
                  language: language.id,
                }),

                S.divider(),

                group(S, {
                  title: "Resources",
                  icon: getIconForSchema(S, "page.blogs"),
                }).child(
                  list(S, { title: "Resources" }).items([
                    singleton(S, {
                      id: "page_resources",
                      type: "page.resources",
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
                            icon: () => <MenuSquare weight="thin" size={20} />,
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
                            icon: () => <MenuSquare weight="thin" size={20} />,
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
                            icon: () => <MenuSquare weight="thin" size={20} />,
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
                            icon: () => <MenuSquare weight="thin" size={20} />,
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
                            icon: () => <MenuSquare weight="thin" size={20} />,
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
                            icon: () => <MenuSquare weight="thin" size={20} />,
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
                            icon: () => <MenuSquare weight="thin" size={20} />,
                          }),
                          documentList(S, {
                            type: "page.video",
                            title: "Videos",
                            language: language.id,
                          }),
                        ]),
                      ),
                  ]),
                ),

                group(S, {
                  title: "Newsroom",
                  icon: getIconForSchema(S, "page.news"),
                }).child(
                  list(S, { title: "Newsroom" }).items([
                    singleton(S, {
                      id: "page_newsroom",
                      type: "page.newsroom",
                      language: language.id,
                    }),
                    S.divider(),
                    S.listItem()
                      .title("News")
                      .icon(getIconForSchema(S, "page.news"))
                      .child(
                        list(S, { title: "News" }).items([
                          singleton(S, {
                            id: `page_news`,
                            type: "page.news",
                            language: language.id,
                            icon: () => <MenuSquare weight="thin" size={20} />,
                          }),
                          documentList(S, {
                            type: "page.newsarticle",
                            title: "News articles",
                            language: language.id,
                          }),
                        ]),
                      ),
                    S.listItem()
                      .title("Press Releases")
                      .icon(getIconForSchema(S, "page.pressreleases"))
                      .child(
                        list(S, { title: "Press Releases" }).items([
                          singleton(S, {
                            id: `page_pressreleases`,
                            type: "page.pressreleases",
                            language: language.id,
                            icon: () => <MenuSquare weight="thin" size={20} />,
                          }),
                          documentList(S, {
                            type: "page.pressrelease",
                            title: "Press releases",
                            language: language.id,
                          }),
                        ]),
                      ),
                    S.listItem()
                      .title("Media Coverage")
                      .icon(getIconForSchema(S, "page.mediacoverage"))
                      .child(
                        list(S, {
                          title: "Media Coverage",
                          type: "page.mediacoverage",
                        }).items([
                          singleton(S, {
                            id: `page_mediacoverage`,
                            type: "page.mediacoverage",
                            language: language.id,
                            icon: () => <MenuSquare weight="thin" size={20} />,
                          }),
                          documentList(S, {
                            type: "page.mediacoveragearticle",
                            title: "Media Coverage articles",
                            language: language.id,
                          }),
                        ]),
                      ),
                  ]),
                ),

                group(S, {
                  title: "Tags",
                  icon: getIconForSchema(S, "page.tag"),
                }).child(
                  list(S, { title: "Tags" }).items([
                    singleton(S, {
                      id: "page_tags",
                      type: "page.tags",
                      language: language.id,
                      icon: () => <MenuSquare weight="thin" size={20} />,
                    }),
                    documentList(S, {
                      type: "page.tag",
                      title: "Tags",
                      language: language.id,
                    }),
                  ]),
                ),
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
                  id: `page_search`,
                  type: "page.search",
                  language: language.id,
                }),
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
                S.divider(),

                group(S, {
                  title: "Collections",
                  icon: () => <PapertrayLines weight="thin" size={20} />,
                }).child(
                  list(S, { title: "Collections" }).items([
                    group(S, {
                      title: "Pricing",
                      icon: getIconForSchema(S, "page.pricing"),
                    }).child(
                      list(S, { title: "Pricing" }).items([
                        orderableDocumentListDeskItem({
                          type: "pricing.plan",
                          title: "Plans",
                          icon: getIconForSchema(S, "pricing.plan"),
                          filter: `language == $language`,
                          params: {
                            language: language.id,
                          },
                          S,
                          context,
                        }),

                        orderableDocumentListDeskItem({
                          type: "pricing.feature",
                          title: "Features",
                          icon: getIconForSchema(S, "pricing.feature"),
                          filter: `language == $language`,
                          params: {
                            language: language.id,
                          },
                          S,
                          context,
                        }),
                      ]),
                    ),
                    documentList(S, {
                      type: "person",
                      title: "People",
                      language: language.id,
                    }),
                    documentList(S, {
                      type: "faq.item",
                      title: "Frequently Asked Questions",
                      icon: () => <FolderQuestion weight="thin" size={20} />,
                      language: language.id,
                    }),
                    documentList(S, {
                      type: "testimonials.item",
                      title: "Testimonials",
                      icon: () => <MessagingLines weight="thin" size={20} />,
                      language: language.id,
                    }),
                  ]),
                ),

                S.listItem()
                  .title("Unpublished pages")
                  .icon(() => <TriangleExclamation weight="thin" size={20} />)
                  .child(
                    S.documentList()
                      .title("Unpublished pages")
                      .filter(
                        `_type match "page.*" && _id in path("drafts.*") && language == '${language.id}'`,
                      ),
                  ),
              ]),
            ),
      ),

      group(S, {
        title: "Collections",
        icon: () => <PapertrayLines weight="thin" size={20} />,
      }).child(
        list(S, { title: "Collections" }).items([
          group(S, {
            title: "Pricing",
            icon: getIconForSchema(S, "page.pricing"),
          }).child(
            list(S, { title: "Pricing" }).items([
              orderableDocumentListDeskItem({
                type: "pricing.plan",
                title: "Plans",
                icon: getIconForSchema(S, "pricing.plan"),
                S,
                context,
              }),
              orderableDocumentListDeskItem({
                type: "pricing.feature",
                title: "Features",
                icon: getIconForSchema(S, "pricing.feature"),
                S,
                context,
              }),
            ]),
          ),
          documentList(S, { type: "person", title: "People" }),
          documentList(S, {
            type: "faq.item",
            title: "Frequently Asked Questions",
            icon: () => <FolderQuestion weight="thin" size={20} />,
          }),
          documentList(S, {
            type: "testimonials.item",
            title: "Testimonials",
            icon: () => <MessagingLines weight="thin" size={20} />,
          }),
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
          singleton(S, { id: "config_icons", type: "config.icons" }),
          singleton(S, { id: "secret.config_cms", type: "config.cms" }),
          singleton(S, {
            id: "secret.config_deployment",
            type: "config.deployment",
          }),
        ]),
      ),
      documentList(S, { type: "redirect", title: "Redirects" }),
      documentList(S, { type: "script", title: "Scripts" }),
      group(S, {
        title: "Presets",
        icon: () => <BlueprintPaper weight="thin" size={20} />,
      }).child(
        list(S, { title: "Presets" }).items([
          documentList(S, { type: "preset.blocks" }),
          documentList(S, { type: "preset.button" }),
          documentList(S, { type: "preset.decoration" }),
          S.divider(),
          documentList(S, { type: "preset.theme.title" }),
          documentList(S, { type: "preset.theme.text" }),
          documentList(S, { type: "preset.theme.block" }),
        ]),
      ),

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

  const cleanedDesk = await cleanDesk(structure);
  return cleanedDesk;
};

export const defaultDocumentNode = (
  S: StructureBuilder,
  context: DefaultDocumentNodeContext,
): DocumentBuilder => {
  const schemaType = context?.schemaType;

  // add preview iframe for pages
  const views: any[] = [S.view.form()];
  if (
    schemaType.startsWith("page.") ||
    schemaType.startsWith("preset.") ||
    schemaType === "script" ||
    schemaType === "navigation" ||
    schemaType === "footer" ||
    schemaType === "pricing.feature"
  ) {
    views.push(PreviewView(S));

    if (
      schemaType.startsWith("page.") &&
      ![
        "preset.blocks",
        "page.notfound",
        "page.sitemap",
        "page.search",
      ].includes(schemaType)
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
    apiVersion: SANITY_API_VERSION,
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
      .apiVersion(SANITY_API_VERSION)
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
