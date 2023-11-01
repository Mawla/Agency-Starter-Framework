import { languages, LanguageType } from "./languages";
import { Logo } from "./studio/components/Logo";
import { createPublishAction } from "./studio/components/PublishAction";
import { productionURLPane } from "./studio/components/productionURLPane";
import { schemaTypes } from "./studio/schemas";
import { structure, defaultDocumentNode } from "./studio/structure";
import {
  LINKABLE_SCHEMAS,
  SANITY_API_VERSION,
  TRANSLATABLE_SCHEMAS,
} from "./types.sanity";
import { languageFilter } from "@sanity/language-filter";
import { visionTool } from "@sanity/vision";
import { defineConfig, Template } from "sanity";
import { media } from "sanity-plugin-media";
import { muxInput } from "sanity-plugin-mux-input";
import { deskTool } from "sanity/desk";

const env = import.meta.env;

export default defineConfig({
  projectId: env.SANITY_STUDIO_API_PROJECT_ID,
  dataset: env.SANITY_STUDIO_API_DATASET,
  title: "Sanity Studio",
  plugins: [
    deskTool({
      structure,
      defaultDocumentNode,
    }),
    languageFilter({
      supportedLanguages: languages,
      documentTypes: Object.keys(TRANSLATABLE_SCHEMAS),
      filterField: (enclosingType, field, selectedLanguageIds) => {
        return !(
          languages.map(({ id }) => id).includes(field.name as LanguageType) &&
          !selectedLanguageIds.includes(field.name)
        );
      },
    }),
    media(),
    visionTool({
      defaultApiVersion: SANITY_API_VERSION,
    }),
    muxInput(),
    productionURLPane,
  ],

  document: {
    actions: (prev, context) => {
      const schema = Object.entries(context.schema._registry)
        .find(([key, value]) => key === context.schemaType)?.[1]
        .get();

      if (schema.options?.singleton) {
        return [
          ...prev
            .filter(
              ({ action }) =>
                action == "publish" ||
                action == "unpublish" ||
                action == "delete",
            )
            .map((originalAction) =>
              originalAction.action === "publish"
                ? createPublishAction(originalAction)
                : originalAction,
            ),
        ];
      }
      return prev.map((originalAction) =>
        originalAction.action === "publish"
          ? createPublishAction(originalAction)
          : originalAction,
      );
    },
    newDocumentOptions: (prev, context) => {
      prev = prev.filter((option: any) => {
        if (option.templateId.startsWith("config.")) return false;
        if (option.templateId.startsWith("media.")) return false;
        if (option.templateId.startsWith("card.")) return false;
        if (option.templateId.startsWith("password.")) return false;
        if (option.templateId === "footer") return false;
        if (option.templateId === "navigation") return false;
        if (option.templateId === "page.home") return false;
        if (option.templateId === "page.notfound") return false;
        if (option.templateId === "page.sitemap") return false;

        const schema = context?.schema?._original?.types.find(
          ({ name }: { name: string }) => name === option.templateId,
        );
        if ((schema?.options as any)?.singleton) return false;
        return true;
      });

      return prev;
    },
  },

  schema: {
    types: schemaTypes,

    templates: Object.keys(LINKABLE_SCHEMAS)
      .map((schemaType) => {
        const schema = schemaTypes.find(({ name }) => name === schemaType);
        if (schema.options?.singleton) return null;

        return {
          id: `${schemaType}-with-language`,
          title: schema.title,
          parameters: [{ name: "language", type: "string" }],
          schemaType: schemaType,
          value: (params: { language: LanguageType }) => ({
            language: params?.language,
          }),
        };
      })
      .filter(Boolean) as Template<any, any>[],
  },
  studio: {
    components: {
      logo: Logo,
    },
  },
});
