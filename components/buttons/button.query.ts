import { languages } from "../../languages";
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
  coalesce(
    select(
      ${languages.map(
        ({ id }) => `
        language == '${id}' => coalesce(${findTopLevelSitemap})[_id == ^._id][0].paths.${id}
        `,
      )}
    ),
    coalesce(${findTopLevelSitemap})[_id == ^._id][0].paths.[$language]
  )
`;

export const buttonHrefQuery = groq`
  coalesce(
    coalesce(
      href, 
      // coalesce(${findTopLevelSitemap})[_id == ^.internal._ref][0].paths[^.language] // why doesn't this work? That would make it way shorter than using this loop
      select(
        ${languages.map(
          ({ id }) => `
          language == '${id}' => coalesce(${findTopLevelSitemap})[_id == ^.internal._ref][0].paths.${id}
          `,
        )}
      ),
      coalesce(${findTopLevelSitemap})[_id == ^.internal._ref][0].paths.[$language],
      '#'+ dialog, 
      file.asset->url
    ) + coalesce(params, ''), 
    params
  )`;

export const buttonFieldsQuery = groq`
  _key,
  language,
  "href": ${buttonHrefQuery},
  label,
  icon,
  iconPosition,
  download,
  variant,
  "target": select(newWindow => '_blank') 
`;

export const buttonQuery = groq`{
  ${buttonFieldsQuery}
}`;

export const buttonWithChildrenQuery = groq`
{
  ${buttonFieldsQuery},
  children[] ${buttonQuery}
}`;

export const hrefFieldQuery = groq`
  "href": link ${buttonQuery}.href,
  "target": select(newWindow => '_blank') 
`;
