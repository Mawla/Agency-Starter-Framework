import { backgroundClasses, divideClasses, textClasses } from "../../theme";
import { ColorType } from "../../types";
import { IconLoaderProps } from "../images/IconLoader";
import PortableText, { PortableTextProps } from "../portabletext/PortableText";
import Text from "../text/Text";
import { TitleColorType } from "../title/title.options";
import * as RadixAccordion from "@radix-ui/react-accordion";
import cx from "clsx";
import React, { ComponentType, lazy } from "react";
import { PortableTextBlock } from "sanity";

export type AccordionItemType = {
  _key?: string;
  title?: string;
  content?: PortableTextProps["content"];
};

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../../components/images/IconLoader"
    ),
);
export type AccordionProps = {
  items: AccordionItemType[];
  theme?: {
    background?: ColorType;
    title?: TitleColorType;
    icon?: ColorType;
    divider?: ColorType;
  };
};

export const Accordion = ({ items, theme }: AccordionProps) => {
  if (!Boolean(items.filter(Boolean)?.length)) return null;

  return (
    <div className="accordion radix-accordion">
      <RadixAccordion.Root
        type="multiple"
        className={cx(
          theme?.background && backgroundClasses[theme?.background],
          theme?.divider && divideClasses[theme?.divider],
          theme?.divider && "divide-y",
        )}
        data-no-animate
      >
        {items?.map(({ _key, title = "", content }) => (
          <RadixAccordion.Item
            value={_key || title}
            key={_key || title}
            id={_key || title}
            className="accordion-item radix-scroll-margin"
          >
            <RadixAccordion.Header
              className={cx(
                "hover:underline",
                theme?.title ? textClasses[theme?.title] : "text-current",
              )}
            >
              <RadixAccordion.Trigger className="p-5 text-lg flex items-center w-full group">
                <div className="pr-6 text-left font-semibold">{title}</div>
                <span className="flex-shrink-0 ml-auto">
                  <IconLoader
                    icon="chevrondown"
                    className={cx(
                      "block w-6 h-6 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180",
                      theme?.icon ? textClasses[theme?.icon] : "text-current",
                    )}
                  />
                </span>
              </RadixAccordion.Trigger>
            </RadixAccordion.Header>
            <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <Text
                className="h-full px-5 pb-5 pt-0 text-left text-current"
                size="md"
              >
                <PortableText content={content as PortableTextBlock[]} />
              </Text>
            </RadixAccordion.Content>
          </RadixAccordion.Item>
        ))}
      </RadixAccordion.Root>
    </div>
  );
};

export default React.memo(Accordion);
