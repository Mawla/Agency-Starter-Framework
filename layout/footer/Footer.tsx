import { Wrapper } from "../../components/block/Wrapper";
import { SpaceType } from "../../components/block/spacing.options";
import { Link } from "../../components/buttons/Link";
import { IconLoader } from "../../components/images/IconLoader";
import { ColorType, ImageType } from "../../types";
import { FooterBreadcrumb } from "./Footer.Breadcrumb";
import { FooterLogo } from "./Footer.Logo";
import { FooterMenu } from "./Footer.Menu";
import React from "react";

export type FooterProps = {
  socials?: {
    _key?: string;
    label?: string;
    href?: string;
    icon?: string;
  }[];
  links?: {
    _key?: string;
    title?: string;
    href?: string;
    current?: boolean;
    items: { label?: string; href?: string; current?: boolean }[];
  }[];
  copyright?: string;
  info?: string;
  legal?: string;
  legalLinks?: {
    _key?: string;
    label?: string;
    href?: string;
  }[];
  logo?: { mobile?: ImageType; desktop?: ImageType };
  theme?: {
    block?: {
      background?: ColorType;
      space?: SpaceType;
      text?: ColorType;
    };
  };
  hideBreadcrumb?: boolean;
};

export const Footer = ({
  socials,
  links,
  copyright = "©",
  info,
  legal,
  legalLinks,
  logo,
  theme,
  hideBreadcrumb,
}: FooterProps) => {
  return (
    <footer>
      <Wrapper
        theme={{
          ...theme?.block,
        }}
        className="text-[14px]"
      >
        {hideBreadcrumb !== true && <FooterBreadcrumb />}

        <div className="grid lg:grid-cols-12 lg:gap-5" data-no-animate>
          <div className="lg:col-span-4 flex flex-col gap-4 lg:pr-20 mb-10 lg:mb-0 max-w-sm lg:max-w-none">
            {logo && (
              <div>
                <FooterLogo mobile={logo?.mobile} desktop={logo?.desktop} />
              </div>
            )}

            {info && <p>{info}</p>}

            {Boolean(socials?.length) && (
              <ul className="flex gap-4 items-center">
                {socials?.map(({ _key, label, href, icon }) => (
                  <li key={_key}>
                    {href && (
                      <Link
                        href={href}
                        className="block overflow-hidden"
                        rel="noopener noreferrer"
                        target="_blank"
                        showExternalIcon={false}
                      >
                        <span className="sr-only">{label}</span>
                        <IconLoader
                          icon={icon}
                          removeColors={false}
                          removeDimensions={false}
                        />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* links */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {links?.map(({ _key, title, ...rest }) => (
              <FooterMenu key={_key} title={title} {...rest} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:items-center mt-10 pt-10 relative">
          <span className="absolute inset-x-0 h-px block opacity-10 top-0 bg-current" />

          <div className="flex gap-4 leading-relaxed">
            {copyright && <p className="font-medium ">{copyright}</p>}
            {legal && <p>{legal}</p>}
          </div>

          {Boolean(legalLinks?.length) && (
            <ul className="flex flex-wrap gap-x-5 gap-y-3 items-center text-[12px] leading-relaxed">
              {legalLinks?.map(({ _key, label, href }) => (
                <li key={_key}>
                  {href && (
                    <Link href={href} className="hover:underline">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Wrapper>
    </footer>
  );
};
