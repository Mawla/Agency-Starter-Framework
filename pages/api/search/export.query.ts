import { getSitemapQuery } from "../../../queries/sitemap.query";
import { LINKABLE_SCHEMAS } from "../../../types.sanity";
import groq from "groq";

export const getExportQuery = ({
  id,
  type,
}: {
  id?: string;
  type?: string;
}) => groq`
{
  "sitemap": ${getSitemapQuery()},
  "domain": *[_id == 'config_general'][0]{ domain }.domain
} {
  sitemap,
  domain,
  "page": *[
      !(_id in path("drafts.**")) 
      && _type in [${Object.keys(LINKABLE_SCHEMAS)
        .map((schema) => `'${schema}'`)
        .join(", ")}]
      && locked != true 
      && seo.excludeFromSitemap != true
      && defined(blocks)
      && count(blocks) > 0
      ${id ? `&& _id == '${id}'` : ""}
      ${type ? `&& _type == '${type}'` : ""}
    ]{
    _updatedAt,
    _id,
    title,
    "url": ^.sitemap[_id == ^._id][0] {
      "path": 'https://' + ^.^.domain + '' + path
    }.path,
    "description": coalesce(description, seo.description),
    "body": array::join(
      array::compact(
        [
          // seo
          title,
          description,
          seo.title,
          seo.description,

          // tags
          array::join(
            array::compact(
              tags[]->title
            )
          , '\n'),

          // blocks
          array::join(
            blocks[
              !(_type in path('studio.*')) 
              && disabled != true
              && excludeFromSearchIndex != true
              && !(_type in ['block.block0', 'block.block12', 'block.block13'])
            ] {
            "text": array::join(array::compact([
              coalesce(pt::text(title), title),
              coalesce(pt::text(intro), intro), 
              coalesce(pt::text(body), body), 
              coalesce(pt::text(content), content), 
              coalesce(pt::text(footer), footer), 

              // faq
              ...faq[] {
                ...coalesce(@ ->, @) {
                  "text": array::join([
                    title,
                    pt::text(content),
                  ], '\n'),
                }
              }.text,

              // testimonials poster
              ...testimonials[] {
                ...coalesce(@ ->, @) {
                  "text": array::join([
                    title,
                    pt::text(content),
                  ], '\n'),
                }
              }.text,

              // cards
              ...items[] {
                _type == "card.composable" || _type == "item" => {
                  "text": array::join(array::compact([
                    title,
                    subtitle,
                    pt::text(content),
                    pt::text(intro),
                  ]), '\n')
                },

                // testimonial reference
                _type == "card.testimonial" && defined(testimonialRef) => @.testimonialRef-> {
                  "text": array::join(array::compact([
                    title,
                    subtitle,
                    pt::text(content),
                  ]), '\n')
                },

                // plain testimonial
                _type == "card.testimonial" && defined(testimonial) => testimonial{
                  "text": array::join(array::compact([
                    title,
                    subtitle,
                    pt::text(content),
                  ]), '\n')
                }
              }.text
            ]), '\n'),
          }.text, '\n')
        ]
      )
    , '\n '),
  }
}.page[]`;
