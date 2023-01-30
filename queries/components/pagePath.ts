import { LanguageType } from "../../languages";
import groq from "groq";

/**
 * This query fetches the current page with its parent, grandparent etc
 * {
 *   path,
 *   title,
 *   parent: {
 *     path,
 *     title,
 *     parent { etc }
 *   }
 * }
 */

export const getPagePathQuery = (language: LanguageType) => groq`
^.sitemap[_id == $_id][0] { 
    "path": paths.${language}, 
    "title": titles.${language},
    "parent": ^.^.sitemap[_id == ^.parent] {
      "path": paths.${language}, 
      "title": titles.${language},
      "parent": ^.^.^.sitemap[_id == ^.parent] {
        "path": paths.${language}, 
        "title": titles.${language},
        "parent": ^.^.^.^.sitemap[_id == ^.parent] {
          "path": paths.${language}, 
          "title": titles.${language},
          "parent": ^.^.^.^.^.sitemap[_id == ^.parent] {
            "path": paths.${language}, 
            "title": titles.${language},
            "parent": ^.^.^.^.^.^.sitemap[_id == ^.parent] {
              "path": paths.${language}, 
              "title": titles.${language},
              "parent": ^.^.^.^.^.^.^.sitemap[_id == ^.parent] {
                "path": paths.${language}, 
                "title": titles.${language},
              }
            }
          }
        }
      }
    }
  }
`;
