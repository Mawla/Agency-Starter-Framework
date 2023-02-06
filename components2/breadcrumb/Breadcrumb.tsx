import { PageContext } from "../../context/PageContext";
import { FlatBreadcrumbType } from "./breadcrumb.query";
import cx from "classnames";
import Link from "next/link";
import React from "react";

export type BreadcrumbProps = {
  path?: FlatBreadcrumbType;
};

export const Breadcrumb = ({ path }: BreadcrumbProps) => {
  const { breadcrumb } = React.useContext(PageContext);
  path = path || breadcrumb;

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
                  ["font-bold pointer-events-none"]:
                    index === (path || []).length - 1,
                },
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
