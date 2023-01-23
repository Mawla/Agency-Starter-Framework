import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { getBreadCrumbForPath } from "../../helpers/sitemap/getBreadCrumbForPath";
import { languages, LanguageType } from "../../languages";
import { SitemapItemType } from "../../queries/sitemap";
import cx from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export type BreadcrumbProps = {
  path?: SitemapItemType[];
};

export const Breadcrumb = ({ path }: BreadcrumbProps) => {
  const { isPreviewMode, language } = React.useContext(PageContext);
  const { sitemap } = React.useContext(SiteContext);
  const pathname = usePathname();

  path =
    path || getBreadCrumbForPath(pathname, sitemap, language as LanguageType);

  if (isPreviewMode) {
    path = "Path to page".split(" ").map((label) => ({
      _id: "",
      _type: "page.content",
      title: label,
      titles: languages.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: label }),
        {}
      ) as SitemapItemType["titles"],
      path: `/${label}`,
      paths: languages.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: `/${curr.id}` }),
        {}
      ) as SitemapItemType["paths"],
      _updatedAt: "",
    }));
  }

  if (!path?.length) return null;

  return (
    <nav aria-label="breadcrumbs" className="overflow-auto text-md">
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex font-normal"
      >
        {path?.map((item, index) => (
          <li
            key={item.path}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="whitespace-nowrap"
          >
            <Link
              href={item.path || ""}
              itemProp="item"
              aria-current={
                index === (path || []).length - 1 ? "location" : false
              }
              className={cx(
                "opacity-75 underline-offset-2 hover:underline hover:opacity-100 transition-opacity text-current",
                {
                  ["font-bold"]: index === (path || []).length - 1,
                }
              )}
            >
              <span itemProp="name">{item.title}</span>
            </Link>
            <meta itemProp="position" content={`${index + 1}`} />
            {index < (path || []).length - 1 && (
              <span className="px-2">&rsaquo;</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
