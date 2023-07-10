import { Wrapper } from "../../components/block/Wrapper";
import { Link } from "../../components/buttons/Link";
import { IconLoader } from "../../components/images/IconLoader";
import { IconType } from "../../types";
import { FooterBreadcrumb } from "./Footer.Breadcrumb";
import { FooterLogo } from "./Footer.Logo";
import { FooterMenu } from "./Footer.Menu";
import React from "react";

export type FooterProps = {
  socials: { label?: string; href?: string; icon: IconType }[];
  links: {
    title?: string;
    href?: string;
    current?: boolean;
    items: { label?: string; href?: string; current?: boolean }[];
  }[];
  copyright?: string;
  legal?: string;
  legalLinks?: { label?: string; href?: string }[];
};

export const Footer = ({
  socials,
  links,
  copyright = "©",
  legal,
  legalLinks,
}: FooterProps) => {
  return (
    <footer>
      <Wrapper theme={{ space: { top: "none", bottom: "sm" } }}>
        <FooterBreadcrumb />
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-x-8 md:gap-x-8 md:gap-y-10 flex-grow">
            {links?.map(({ title, ...rest }) => (
              <FooterMenu key={title} title={title} {...rest} />
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-[100px] text-md text-gray-500">
          <div className="flex gap-10 flex-wrap">
            <div className="flex gap-3 md:gap-10 flex-col md:flex-row flex-wrap">
              <div className="translate-y-1 block">
                <FooterLogo />
              </div>

              {(legal || copyright) && (
                <p className="text-gray-900 text-sm leading-relaxed">
                  {copyright && <strong className="block">{copyright}</strong>}
                  {legal && <span className="block">{legal}</span>}
                </p>
              )}
            </div>

            <div className="flex-1">
              {(Boolean(socials?.length) || Boolean(legalLinks?.length)) && (
                <ul className="flex md:justify-end gap-4 md:gap-6 items-center">
                  {legalLinks?.map(({ label, href }) => (
                    <li
                      key={label}
                      className="border-r border-gray-200 pr-4 md:pr-6"
                    >
                      {href && (
                        <Link href={href} className="text-gray-900">
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}

                  {socials?.map(({ label, href, icon }) => (
                    <li key={label}>
                      {href && (
                        <Link
                          href={href}
                          className="block w-7 h-7 overflow-hidden text-gray-500"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <IconLoader icon={icon} />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};
