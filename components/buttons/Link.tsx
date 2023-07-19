import { isInternalLink } from "../../helpers/sitemap/isInternalLink";
import { LanguageType } from "../../languages";
import { IconLoaderProps } from "../images/IconLoader";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { ComponentType, lazy } from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () => import(/* webpackChunkName: "IconLoader" */ "../images/IconLoader"),
);

export type LinkProps = {
  href: string;
  children?: React.ReactElement | React.ReactNode;
  className?: string;
  target?: "_blank";
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
        {target === "_blank" && showExternalIcon && (
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
      {target === "_blank" && showExternalIcon && (
        <IconLoader icon="externallink" className="ml-1 inline-block w-4 h-4" />
      )}
    </a>
  );
};

export default React.memo(Link);
