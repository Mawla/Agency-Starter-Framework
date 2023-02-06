import { getPathForId } from "./helpers/sitemap/getPathForId";
import { baseLanguage, languages, LanguageType } from "./languages";
import { getSitemapQuery, SitemapItemType } from "./queries/sitemap";
import { schemaTypes } from "./studio/schemas";
import { structure, defaultDocumentNode } from "./studio/structure";
import { TRANSLATABLE_SCHEMAS } from "./types.sanity";
import { languageFilter } from "@sanity/language-filter";
import { visionTool } from "@sanity/vision";
import { defineConfig, WorkspaceOptions } from "sanity";
import { cloudinarySchemaPlugin } from "sanity-plugin-cloudinary";
import { media } from "sanity-plugin-media";
import { muxInput } from "sanity-plugin-mux-input";
import { deskTool } from "sanity/desk";

const CONFIG = {
  projectId: (import.meta as any).env.SANITY_STUDIO_API_PROJECT_ID,
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
      defaultApiVersion: "vX",
    }),
    muxInput(),
    cloudinarySchemaPlugin(),
  ],

  document: {
    productionUrl: async (prev: any, context: any) => {
      const { client, document } = context;

      const sitemap: SitemapItemType[] = await client.fetch(getSitemapQuery());
      const path = getPathForId(document._id, sitemap, baseLanguage);

      if (path === "/" && document._id.indexOf("page_homepage") === -1) {
        return prev;
      }

      if (path) {
        return `${(import.meta as any).env.SANITY_STUDIO_PROJECT_PATH.replace(
          /\/+$/,
          "",
        )}${path}`;
      }

      return prev;
    },
  },

  schema: {
    types: schemaTypes,
  },
};

const ENVIRONMENTS = [
  {
    name: "development",
    title: "Development",
    code: "dev",
    dataset: "development",
    color: "#111",
  },
  {
    name: "staging",
    title: "Staging",
    code: "stg",
    dataset: "staging",
    color: "#FFA500",
  },
  {
    name: "production",
    title: "Production",
    code: "prod",
    dataset: "production",
    color: "#FF0000",
  },
];

export default defineConfig(
  ENVIRONMENTS.map(
    (env) =>
      ({
        ...CONFIG,
        dataset: env.dataset,
        basePath: `/cms/${env.name}`,
        name: env.name,
        title: env.title,
        icon: () => (
          <div
            style={{
              borderRadius: 3,
              height: "100%",
              display: "grid",
              placeItems: "center",
              background: env.color,
              color: "#fff",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            {env.code}
          </div>
        ),
      } as WorkspaceOptions),
  ),
);
