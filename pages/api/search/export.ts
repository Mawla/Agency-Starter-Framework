import { getSitemapQuery } from "../../../queries/sitemap.query";
import { LINKABLE_SCHEMAS } from "../../../types.sanity";
import { sanityClient } from "../sanity-client";
import groq from "groq";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message?: string;
  data?: {
    _id: string;
    title?: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { id, type } = req.query;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const allPages = await sanityClient.fetch(
    groq`
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
          ${id ? `&& _id == '${id}'` : ""}
          ${type ? `&& _type == '${type}'` : ""}
        ]{
        _updatedAt,
        _id,
        title,
        "url": ^.sitemap[_id == ^._id][0] {
          "path": 'https://' + ^.^.domain + '' + path
        }.path,
        "body": array::join(blocks[
            !(_type in path('studio.*')) 
            && disabled != true
          ] {
          "text": array::join(array::compact([
            ^.description,
            ^.seo.title,
            ^.seo.description,
            title,
            pt::text(title), 
            pt::text(intro), 
            pt::text(body), 
            pt::text(content), 
            pt::text(footer),

            // faq
            ...faq[] {
              ...coalesce(@ ->, @) {
                "text": array::join([
                  title,
                  pt::text(content),
                ], ' '),
              }
            }.text,

            // cards
            ...items[] {
              _type == "card.composable" => {
                "text": array::join(array::compact([
                  title,
                  subtitle,
                  pt::text(content),
                ]), ' ')
              },

              // testimonial reference
              _type == "card.testimonial" && defined(testimonialRef) => @.testimonialRef-> {
                "text": array::join(array::compact([
                  title,
                  subtitle,
                  pt::text(content),
                ]), ' ')
              },

              // plain testimonial
              _type == "card.testimonial" && defined(testimonial) => testimonial{
                "text": array::join(array::compact([
                  title,
                  subtitle,
                  pt::text(content),
                ]), ' ')
              }
              
            }.text
          ]), ' '),
        }.text, '')
      }
    }.page[]`,
  );

  if (!allPages) {
    return res.status(400).json({ message: `Failed to fetch page data` });
  }

  res.status(200).json({ data: allPages });
}
