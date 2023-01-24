import { languages, LanguageType } from "./languages";
import { schemaTypes } from "./studio/schemas";
import { structure, defaultDocumentNode } from "./studio/structure";
import { TRANSLATABLE_SCHEMAS } from "./types.sanity";
import { languageFilter } from "@sanity/language-filter";
import { visionTool } from "@sanity/vision";
import { defineConfig, WorkspaceOptions } from "sanity";
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
    visionTool({
      defaultApiVersion: "vX",
    }),
  ],

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
      } as WorkspaceOptions)
  )
);
