import { Wrapper } from "../../components/block/Wrapper";
import { SpaceType } from "../../components/block/spacing.options";
import { Link } from "../../components/buttons/Link";
import { IconLoader } from "../../components/images/IconLoader";
import { backgroundClasses } from "../../theme";
import { ColorType, ImageType } from "../../types";
import { FooterBreadcrumb } from "./Footer.Breadcrumb";
import { FooterLogo } from "./Footer.Logo";
import { FooterMenu } from "./Footer.Menu";
import cx from "classnames";
import React from "react";

export type FooterProps = {
  socials: {
    label?: string;
    href?: string;
    icon?: string;
  }[];
  links: {
    title?: string;
    href?: string;
    current?: boolean;
    items: { label?: string; href?: string; current?: boolean }[];
  }[];
  copyright?: string;
  info?: string;
  legal?: string;
  legalLinks?: { label?: string; href?: string }[];
  logo?: { mobile?: ImageType; desktop?: ImageType };
  theme?: {
    block?: {
      background?: ColorType;
      space?: SpaceType;
      text?: ColorType;
    };
  };
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
}: FooterProps) => {
  return (
    <footer>
      <Wrapper
        theme={{
          ...theme?.block,
        }}
        className="text-[14px]"
      >
        <FooterBreadcrumb />

        <div className="grid grid-cols-12 gap-10 lg:gap-5">
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            {logo && (
              <div>
                <FooterLogo mobile={logo?.mobile} desktop={logo?.desktop} />
              </div>
            )}

            {info && <p>{info}</p>}

            {Boolean(socials?.length) && (
              <ul className="flex gap-4 md:gap-6 items-center">
                {socials?.map(({ label, href, icon }) => (
                  <li key={label}>
                    {href && (
                      <Link
                        href={href}
                        className="block w-7 h-7 overflow-hidden"
                        rel="noopener noreferrer"
                        target="_blank"
                        showExternalIcon={false}
                      >
                        <IconLoader icon={icon} title={label} />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* links */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {links?.map(({ title, ...rest }) => (
              <FooterMenu key={title} title={title} {...rest} />
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
            <ul className="flex gap-5 items-center text-[12px] leading-relaxed">
              {legalLinks?.map(({ label, href }) => (
                <li key={label}>
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
