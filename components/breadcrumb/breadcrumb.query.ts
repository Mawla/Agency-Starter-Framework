import { LanguageType } from "../../languages";
import groq from "groq";

/**
 * This query fetches the current page with its parent, grandparent etc
 */

export type NestedBreadcrumbType = {
  title: string;
  path: string;
  parent: NestedBreadcrumbType | null;
};

export type FlatBreadcrumbItemType = Pick<
  NestedBreadcrumbType,
  "title" | "path"
>;
export type FlatBreadcrumbType = FlatBreadcrumbItemType[];

export const getBreadcrumbQuery = (language: LanguageType) => groq`
^.sitemap[_id == $_id][0] { 
    path, 
    title,
    "parent": ^.^.sitemap[_id == ^.parent][0] {
      path, 
      title,
      "parent": ^.^.^.sitemap[_id == ^.parent][0] {
        path, 
        title,
        "parent": ^.^.^.^.sitemap[_id == ^.parent][0] {
          path, 
          title,
          "parent": ^.^.^.^.^.sitemap[_id == ^.parent][0] {
            path, 
            title,
            "parent": ^.^.^.^.^.^.sitemap[_id == ^.parent][0] {
              path, 
              title,
              "parent": ^.^.^.^.^.^.^.sitemap[_id == ^.parent][0] {
                path, 
                title,
              }
            }
          }
        }
      }
    }
  }
`;
