import { PageContext } from "../../context/PageContext";
import IconLoader from "../images/IconLoader";
import { FlatBreadcrumbType } from "./breadcrumb.query";
import cx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export type BreadcrumbProps = {
  path?: FlatBreadcrumbType;
  wrap?: boolean;
};

export const Breadcrumb = ({ path, wrap }: BreadcrumbProps) => {
  const router = useRouter();
  const isPreview = router.pathname.startsWith("/turbopreview");
  const { breadcrumb } = React.useContext(PageContext);
  path = path || breadcrumb;

  if (isPreview) {
    path = [
      {
        path: "/",
        title: "Homepage",
      },
      {
        title: "Resources",
        path: "/resources",
      },
      {
        title: "Blog",
        path: "/resources/blog",
      },
    ];
  }

  if (!path?.length) return null;
  const parentItem = path[path.length - 2];

  return (
    <nav aria-label="breadcrumbs" className="overflow-auto text-sm">
      {parentItem && (
        <div className="md:hidden">
          <Link
            href={parentItem.path}
            className="opacity-75 underline-offset-2 hover:underline hover:opacity-100 transition-opacity text-current flex gap-2 items-center"
          >
            <IconLoader
              icon="arrow"
              className="w-4 h-4 inline-block -scale-[1]"
            />

            {parentItem.title}
          </Link>
        </div>
      )}

      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className={cx("hidden md:flex items-center font-normal", {
          ["flex-wrap"]: wrap,
        })}
      >
        {path?.map((item, index) => (
          <li
            key={item.path || index}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="whitespace-nowrap inline-flex"
          >
            <Link
              href={item.path || ""}
              itemProp="item"
              aria-current={
                index === (path || []).length - 1 ? "location" : false
              }
              className={cx(
                "inline-flex items-center",
                "opacity-75 underline-offset-2 hover:underline hover:opacity-100 transition-opacity text-current",
                {
                  ["pointer-events-none"]: index === (path || []).length - 1,
                },
              )}
            >
              {index === 0 ? (
                <span className="flex items-center">
                  <IconLoader icon="home" className="w-4 h-4 inline-flex" />
                  <span itemProp="name" className="sr-only">
                    {item.title}
                  </span>
                </span>
              ) : (
                <span itemProp="name">{item.title}</span>
              )}
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

export default Breadcrumb;
