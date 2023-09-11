import { isInternalLink } from "../../helpers/sitemap/isInternalLink";
import { LanguageType } from "../../languages";
import { IconLoaderProps } from "../images/IconLoader";
import { FancyboxProps } from "../lightbox/Fancybox";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { ComponentType, lazy } from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () => import(/* webpackChunkName: "IconLoader" */ "../images/IconLoader"),
);

const Fancybox = lazy<ComponentType<FancyboxProps>>(
  () => import(/* webpackChunkName: "Fancybox" */ "../lightbox/Fancybox"),
);

export type LinkProps = {
  href: string;
  children?: React.ReactElement | React.ReactNode;
  className?: string;
  target?: "_blank" | "lightbox";
  rel?: string;
  locale?: LanguageType;
  showExternalIcon?: boolean;
};

export const Link = ({
  href,
  children,
  className,
  target,
  rel,
  locale,
  showExternalIcon = true,
}: LinkProps) => {
  const router = useRouter();

  if (target === "lightbox") {
    // add lightbox query param to href to hide nav and footer in Page.tsx
    href = href.indexOf("?") > -1 ? `${href}&lightbox=1` : `${href}?lightbox=1`;
    return (
      <Fancybox>
        <a
          href={href}
          className={className}
          target={target}
          rel={rel}
          data-fancybox
        >
          {children}
        </a>
      </Fancybox>
    );
  }

  if (!locale) locale = router?.locale as LanguageType;

  if (isInternalLink(href)) {
    return (
      <NextLink
        href={href}
        shallow={href?.indexOf("#") === 0}
        locale={locale}
        target={target}
        className={className}
        rel={rel}
      >
        {children}
        {target === "_blank" && showExternalIcon !== false && (
          <IconLoader
            icon="externallink"
            className="ml-1 inline-block w-4 h-4"
          />
        )}
      </NextLink>
    );
  }

  return (
    <a href={href} className={className} target={target} rel={rel}>
      {children}
      {target === "_blank" && showExternalIcon !== false && (
        <IconLoader icon="externallink" className="ml-1 inline-block w-4 h-4" />
      )}
    </a>
  );
};

export default React.memo(Link);
