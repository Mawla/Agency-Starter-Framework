import { languages } from "../../languages";
import groq from "groq";

export const resolveIdHrefQuery = `
  coalesce(
    select(
      ${languages.map(
        ({ id }) => `
        language == '${id}' => $sitemap[_id == ^._id][0].paths.${id}
        `
      )}
    ),
    $sitemap[_id == ^._id][0].paths.[$language]
  )
`;

export const buttonHrefQuery = groq`
  coalesce(
    coalesce(
      external, 
      // $sitemap[_id == ^.internal._ref][0].paths[^.language] // why doesn't this work? That would make it way shorter than using this loop
      select(
        ${languages.map(
          ({ id }) => `
          language == '${id}' => $sitemap[_id == ^.internal._ref][0].paths.${id}
          `
        )}
      ),
      $sitemap[_id == ^.internal._ref][0].paths.[$language],
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
  variant,
  alt,
  icon,
  iconPosition,
  download,
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
