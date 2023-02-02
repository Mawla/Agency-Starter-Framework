import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroup } from "../../components/buttons/ButtonGroup";
import PortableText from "../../components/content/PortableText";
import { SimpleImage } from "../../components/images/SimpleImage";
import { Bleed } from "../../components/module/Bleed";
import { Text } from "../../components/module/Text";
import { Title } from "../../components/module/Title";
import { Width } from "../../components/module/Width";
import { ImageType } from "../../types";
import React from "react";

export type HeroBasicProps = {
  eyebrow?: string;
  title?: string;
  buttons?: ButtonProps[];
  text?: React.ReactElement;
  image?: ImageType;
};

export const HeroBasic = (data: HeroBasicProps) => {
  if (!data) return null;

  const { eyebrow, title, buttons, text, image }: HeroBasicProps = data;

  return (
    <header className="relative z-0 overflow-hidden text-neutral-500">
      <div className="relative flex flex-row items-center z-30">
        <Bleed bleed="md">
          <Width width="inner">
            <div className="relative flex flex-col tablet:max-w-[75%] lg:max-w-[790px] gap-4">
              {(title || eyebrow) && (
                <Title as="h1" size="4xl" color="neutral-800" eyebrow={eyebrow}>
                  {title}
                </Title>
              )}

              {text && (
                <Text size="2xl" className="mt-2" color="neutral-900">
                  <PortableText content={text as any} />
                </Text>
              )}

              {buttons && (
                <ButtonGroup className="mt-4 md:mt-6 lg:mt-8" items={buttons} />
              )}
              {image && (
                <div className="relative">
                  <SimpleImage
                    {...image}
                    priority
                    loading="eager"
                    width={500}
                    height={500}
                  />
                </div>
              )}
            </div>
          </Width>
        </Bleed>
      </div>
    </header>
  );
};

export default React.memo(HeroBasic);
