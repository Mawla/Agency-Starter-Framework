import { Button } from "../buttons/Button";
import Text from "../module/Text";
import PortableText, { PortableTextProps } from "../portabletext/PortableText";
import * as RadixAccordion from "@radix-ui/react-accordion";
import React from "react";

export type AccordionItemType = {
  _key?: string;
  title?: string;
  content?: PortableTextProps["content"];
};

export type AccordionProps = {
  items: AccordionItemType[];
};

export const Accordion = ({ items }: AccordionProps) => {
  if (!Boolean(items.filter(Boolean)?.length)) return null;

  return (
    <div className="filter drop-shadow-lg radix-accordion border border-neutral-200">
      <RadixAccordion.Root
        type="multiple"
        className="divide-y divide-neutral-200"
      >
        {items?.map(({ _key, title = "", content }) => (
          <RadixAccordion.Item
            value={_key || title}
            key={_key || title}
            id={_key || title}
            className="radix-scroll-margin"
          >
            <RadixAccordion.Header className="bg-white hover:underline radix-accordion-title">
              <RadixAccordion.Trigger className="bg-white p-5 md:p-7 lg:p-8 text-base md:text-md lg:text-lg flex items-center w-full radix-accordion-trigger">
                <div className="pr-3 text-left font-heading text-xl">
                  {title}
                </div>
                <span className="flex-shrink-0 ml-auto">
                  <Button
                    icon="chevron"
                    label=""
                    as="div"
                    theme={{
                      background: { color: "black" },
                      text: { color: "white" },
                    }}
                  />
                </span>
              </RadixAccordion.Trigger>
            </RadixAccordion.Header>
            <RadixAccordion.Content className="bg-white radix-accordion-content overflow-hidden">
              <Text className="h-full p-5 md:p-7 lg:p-8 pt-0 md:pt-0 lg:pt-0 max-w-accordion text-left">
                <PortableText content={content as any} />
              </Text>
            </RadixAccordion.Content>
          </RadixAccordion.Item>
        ))}
      </RadixAccordion.Root>
    </div>
  );
};

export const AccordionMemo = React.memo(Accordion);
