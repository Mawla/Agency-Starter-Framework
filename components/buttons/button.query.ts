import { baseLanguage } from "../../languages";
import groq from "groq";

// To find the top level sitemap we need to travel up an unknown number of scopes
// Doing this is quite ugly, but GROQ doesn't have a method to do such a thing natively.
// Doing this is preferable to including the whole sitemap query
// again for each button/link in the page query.
//
// This little function produces a query like:
// `^.sitemap, ^.^.sitemap, ^.^.^.sitemap, ^.^.^.^.sitemap, ^.^.^.^.^.sitemap, ^.^.^.^.^.^.sitemap, ^.^.^.^.^.^.^.sitemap`;

const numLevels = 8;
const findTopLevelSitemap = new Array(numLevels)
  .fill("")
  .map((x, i) => `${new Array(i + 2).fill("").join("^.")}sitemap`);

export const resolveIdHrefQuery = `
  coalesce(${findTopLevelSitemap})[_id == ^._id][0] { 
    "path": select(language == "${baseLanguage}" => '', '/'+ language) + path
  }.path
`;

export const buttonHrefQuery = groq`
  coalesce(
    coalesce(
      href, 
      coalesce(${findTopLevelSitemap})[_id == ^.internal._ref][0] { 
        "path": select(language == "${baseLanguage}" => '', '/'+ language) + path
      }.path,
      file.asset->url
    ) + coalesce(params, ''), 
    params
  )`;

export const buttonFieldsWithoutThemeQuery = groq`
_key,
language,
"href": ${buttonHrefQuery},
label,
download,
`;

export const buttonThemeFieldsQuery = groq`
icon,
mobile,
tablet,
desktop,
hover,
`;

export const buttonFieldsQuery = groq`
  _key,
  language,
  "href": ${buttonHrefQuery},
  label,
  download,
  "theme": customTheme { 
    ${buttonThemeFieldsQuery}
  },
  "presetTheme": select(
    defined(presetTheme) => presetTheme -> {...}, 
    !defined(customTheme.mobile) => *[_type == 'preset.button' && default][0]
  ) { 
    "name": slug.current,
    ${buttonThemeFieldsQuery}
  },
  target
`;

export const buttonFieldsWithoutDefaultThemeQuery = groq`
  ${buttonFieldsQuery
    .replace(
      "defined(presetTheme) => presetTheme -> {...},",
      "defined(presetTheme) => presetTheme -> {...},",
    )
    .replace(
      "!defined(customTheme.mobile) => *[_type == 'preset.button' && default][0]",
      "",
    )}
`;

export const linkQuery = groq` { ${buttonFieldsWithoutDefaultThemeQuery} }`;

export const buttonQuery = groq`{
  ${buttonFieldsQuery}
}`;

export const hrefFieldQuery = groq`
  "href": link ${buttonQuery}.href,
  target
`;

/**
 * Usage
 *
 * {
 *   ...,
 *   "link": ${getButtonQuery("link")}
 * }
 */
export const getButtonQuery = (fieldName: string) => groq`
  @.${fieldName} ${buttonQuery}
`;
