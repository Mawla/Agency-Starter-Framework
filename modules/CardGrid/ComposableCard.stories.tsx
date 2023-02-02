import {
  SizeType as TextSizeType,
  SIZE_OPTIONS as TEXT_SIZE_OPTIONS,
} from "../../components/module/Text";
import {
  SizeType as TitleSizeType,
  SIZE_OPTIONS as TITLE_SIZE_OPTIONS,
  WeightType,
  WEIGHT_OPTIONS,
} from "../../components/module/Title";
import {
  demoImage,
  demoImage2,
  demoImage3,
  demoImage4,
} from "../../stories/content";
import { ComposableCard, ComposableCardProps } from "./ComposableCard";
import {
  CardAlignType,
  CARD_ALIGN_OPTIONS,
  CardBackgroundColorType,
  CARD_BACKGROUND_COLOR_OPTIONS,
  BorderColorType,
  BORDER_COLOR_OPTIONS,
  CardEffectType,
  CardSpacingType,
  CARD_EFFECT_OPTIONS,
  CARD_SPACING_OPTIONS,
  IconColorType,
  IconSizeType,
  ICON_COLOR_OPTIONS,
  ICON_SIZE_OPTIONS,
  ImageHeightType,
  ImageRatioType,
  ImageRoundedType,
  IMAGE_HEIGHT_OPTIONS,
  IMAGE_RATIO_OPTIONS,
  IMAGE_ROUNDED_OPTIONS,
  TextColorType,
  TEXT_COLOR_OPTIONS,
  TitleColorType,
  TITLE_COLOR_OPTIONS,
} from "./ComposableCardOptions";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: ComposableCard,
  title: "Modules/CardGrid/ComposableCard",
} as Meta;

const DEMO_CONTENT = {
  type: "card.composable",
  title: "Title",
  subtitle: "subtitle",
  text: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
      molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
      accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus
      ipsum dolor.
    </p>
  ),
} as ComposableCardProps;

export const Default = () => <ComposableCard {...DEMO_CONTENT} />;

export const Shadow = () => (
  <ComposableCard
    {...DEMO_CONTENT}
    theme={{
      card: { shadow: true },
    }}
  />
);

export const BackgroundColors = () => (
  <div className="grid grid-cols-5 gap-2">
    {(
      Object.keys(CARD_BACKGROUND_COLOR_OPTIONS) as CardBackgroundColorType[]
    ).map((color: CardBackgroundColorType) => (
      <div key={color}>
        <ComposableCard
          {...DEMO_CONTENT}
          theme={{
            card: { background: color },
          }}
        />
      </div>
    ))}
  </div>
);

export const Icons = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(ICON_SIZE_OPTIONS) as IconSizeType[]).map(
      (size: IconSizeType) =>
        (Object.keys(ICON_COLOR_OPTIONS) as IconColorType[]).map(
          (color: IconColorType) => (
            <div key={size + color}>
              <ComposableCard
                title={size}
                icon="demo"
                theme={{
                  card: { background: "neutral-100" },
                  icon: { size, color },
                }}
              />
            </div>
          ),
        ),
    )}
  </div>
);

export const BorderColors = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(BORDER_COLOR_OPTIONS) as BorderColorType[]).map(
      (color: BorderColorType) => (
        <div key={color}>
          <ComposableCard
            {...DEMO_CONTENT}
            theme={{
              card: { border: color },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const TitleColors = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(TITLE_COLOR_OPTIONS) as TitleColorType[]).map(
      (color: TitleColorType) => (
        <div key={color}>
          <ComposableCard
            title={DEMO_CONTENT["title"]}
            theme={{
              title: { color },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const TitleSizes = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(TITLE_SIZE_OPTIONS) as TitleSizeType[]).map(
      (size: TitleSizeType) => (
        <div key={size}>
          <ComposableCard
            title={DEMO_CONTENT["title"]}
            theme={{
              title: { size },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const TitleWeights = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(WEIGHT_OPTIONS) as WeightType[]).map((weight: WeightType) => (
      <div key={weight}>
        <ComposableCard
          title={DEMO_CONTENT["title"]}
          theme={{
            title: { weight },
          }}
        />
      </div>
    ))}
  </div>
);

export const SubtitleColors = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(TITLE_COLOR_OPTIONS) as TitleColorType[]).map(
      (color: TitleColorType) => (
        <div key={color}>
          <ComposableCard
            subtitle={DEMO_CONTENT["subtitle"]}
            theme={{
              subtitle: { color },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const SubtitleSizes = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(TITLE_SIZE_OPTIONS) as TitleSizeType[]).map(
      (size: TitleSizeType) => (
        <div key={size}>
          <ComposableCard
            subtitle={DEMO_CONTENT["subtitle"]}
            theme={{
              subtitle: { size },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const SubtitleWeights = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(WEIGHT_OPTIONS) as WeightType[]).map((weight: WeightType) => (
      <div key={weight}>
        <ComposableCard
          subtitle={weight}
          theme={{
            subtitle: { weight },
          }}
        />
      </div>
    ))}
  </div>
);

export const TextColors = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(TEXT_COLOR_OPTIONS) as TextColorType[]).map(
      (color: TextColorType) => (
        <div key={color}>
          <ComposableCard
            text={DEMO_CONTENT["text"]}
            theme={{
              text: { color },
              card: { background: "neutral-100" },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const TextSizes = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(TEXT_SIZE_OPTIONS) as TextSizeType[]).map(
      (size: TextSizeType) => (
        <div key={size}>
          <ComposableCard
            text={DEMO_CONTENT["text"]}
            theme={{
              text: { size },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const Alignments = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(CARD_ALIGN_OPTIONS) as CardAlignType[]).map(
      (align: CardAlignType) => (
        <div key={align}>
          <ComposableCard
            {...DEMO_CONTENT}
            title={align}
            image={demoImage2}
            cover={demoImage}
            icon="demo"
            theme={{
              card: { align },
              image: { height: "sm", ratio: "1/1" },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const Clickable = () => (
  <>
    <ComposableCard
      {...DEMO_CONTENT}
      buttons={[{ label: "click me", href: "/" }]}
    />
    <ComposableCard
      {...DEMO_CONTENT}
      theme={{
        card: { border: "neutral-200" },
      }}
      buttons={[{ label: "click me", href: "/" }]}
    />
    <ComposableCard
      {...DEMO_CONTENT}
      title="Card not clickable"
      subtitle="when there is more than 1 button"
      theme={{
        card: { border: "neutral-200" },
      }}
      buttons={[
        { label: "click me", href: "/" },
        { label: "click me 2", href: "/" },
      ]}
    />
  </>
);

export const Cover = () => (
  <div className="w-96">
    <ComposableCard
      {...DEMO_CONTENT}
      cover={demoImage2}
      buttons={[{ label: "click me", href: "/" }]}
    />
    <ComposableCard
      {...DEMO_CONTENT}
      cover={demoImage2}
      theme={{ card: { border: "neutral-200" } }}
      buttons={[{ label: "click me", href: "/" }]}
    />
    <ComposableCard
      {...DEMO_CONTENT}
      cover={demoImage2}
      theme={{ card: { shadow: true } }}
      buttons={[{ label: "click me", href: "/" }]}
    />
    <ComposableCard
      {...DEMO_CONTENT}
      cover={demoImage2}
      theme={{ card: { background: "brand-500" } }}
      buttons={[{ label: "click me", href: "/" }]}
    />
  </div>
);

export const ButtonsHidden = () => (
  <div className="flex gap-10">
    <ComposableCard
      title="Button visible"
      buttons={[{ label: "click me", href: "/" }]}
      theme={{ buttons: { hidden: false }, card: { border: "neutral-200" } }}
    />
    <ComposableCard
      title="Button hidden"
      buttons={[{ label: "click me", href: "/" }]}
      theme={{ buttons: { hidden: true }, card: { border: "neutral-200" } }}
    />
  </div>
);

export const CardSpacing = () => (
  <div className="grid grid-cols-3 gap-2">
    {(Object.keys(CARD_SPACING_OPTIONS) as CardSpacingType[]).map(
      (spacing: CardSpacingType) => (
        <div key={spacing}>
          <ComposableCard
            {...DEMO_CONTENT}
            title={spacing}
            image={demoImage2}
            theme={{
              card: { align: "center", spacing, border: "neutral-200" },
              image: { height: "sm", ratio: "1/1" },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const ImageSizes = () => (
  <div className="flex flex-wrap flex-col gap-10">
    {(Object.keys(IMAGE_HEIGHT_OPTIONS) as ImageHeightType[]).map(
      (height: ImageHeightType) => (
        <div className="grid grid-cols-4 gap-4">
          {(Object.keys(IMAGE_RATIO_OPTIONS) as ImageRatioType[]).map(
            (ratio: ImageRatioType) => (
              <ComposableCard
                {...{
                  type: "card.composable",
                  title: [height, ratio].join(", "),
                  image: demoImage,
                  theme: {
                    card: { background: "neutral-100" },
                    title: { size: "md", color: "neutral-500" },
                    image: {
                      ratio,
                      height,
                    },
                    text: { color: "neutral-900" },
                  },
                }}
              />
            ),
          )}
        </div>
      ),
    )}
  </div>
);

export const ImageRounded = () => (
  <div className="grid grid-cols-3 gap-2">
    {(Object.keys(IMAGE_ROUNDED_OPTIONS) as ImageRoundedType[]).map(
      (rounded: ImageRoundedType) => (
        <div key={rounded}>
          <ComposableCard
            {...DEMO_CONTENT}
            title={rounded}
            image={demoImage2}
            theme={{
              image: { height: "lg", rounded, ratio: "1/1" },
              card: { background: "neutral-800" },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const CardEffects = () => (
  <div className="grid grid-cols-3 gap-2">
    {(Object.keys(CARD_EFFECT_OPTIONS) as CardEffectType[]).map(
      (effect: CardEffectType) => (
        <div key={effect}>
          <ComposableCard
            {...DEMO_CONTENT}
            title={effect}
            icon="demo"
            cover={demoImage2}
            image={demoImage4}
            buttons={[{ label: "button", href: "/" }]}
            theme={{
              card: { effect, border: "neutral-200" },
              title: { color: "action-500" },
              subtitle: { color: "action-500" },
              text: { color: "neutral-900" },
              image: { height: "sm" },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const DemoFullFeaturedCard = () => (
  <div className="w-96">
    <ComposableCard
      {...{
        type: "card.composable",
        title: "title",

        subtitle: "subtitle",
        text: <p>text</p>,
        cover: demoImage,
        image: demoImage2,
        icon: "demo",
        buttons: [
          {
            label: "button 1",
            href: "/",
            variant: "primary",
          },
          {
            label: "button 2",
            href: "/",
            variant: "tertiary",
          },
        ],
        theme: {
          card: { background: "brand-500", align: "right" },
          title: { size: "md", color: "white" },
          text: { size: "md", color: "white" },
          icon: { size: "lg", color: "white" },
          image: { height: "lg", ratio: "16/9", rounded: "xl" },
        },
      }}
    />
  </div>
);

export const DemoStatCard = () => (
  <div className="w-96">
    <ComposableCard
      title="2.5m+"
      subtitle="Over 2.5 million customers"
      text={
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus.
        </p>
      }
      theme={{
        title: {
          size: "4xl",
          color: "brand-500",
        },
        subtitle: {
          size: "lg",
        },
        text: { size: "md" },
      }}
    />
  </div>
);

export const DemoIconCard = () => (
  <div className="w-96">
    <ComposableCard
      {...{
        type: "card.composable",
        title: "Benefit title",
        text: (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a mattis tellus.
          </p>
        ),
        icon: "demo",
        theme: {
          card: { background: "neutral-100" },
          title: { size: "md", color: "neutral-500" },
          icon: { size: "sm", color: "brand-500" },
          text: { color: "neutral-900" },
        },
      }}
    />
  </div>
);

export const DemoImageCard = () => (
  <div className="w-96">
    <ComposableCard
      {...{
        type: "card.composable",
        title: "Facility title",
        cover: demoImage,
        theme: {
          card: { background: "neutral-100" },
          title: { size: "md", color: "neutral-500" },
          text: { color: "neutral-900" },
        },
      }}
    />
  </div>
);

export const DemoPersonCard = () => (
  <div className="w-96">
    <ComposableCard
      {...{
        type: "card.composable",
        title: "Name Surname",
        subtitle: "Prima position",
        text: (
          <p>
            Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
            lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
            velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos. Praesent
            auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
            Donec ut rhoncus ex.
          </p>
        ),
        image: demoImage,
        theme: {
          title: { size: "md", color: "brand-500" },
          subtitle: { size: "md", color: "neutral-500", weight: "regular" },
          image: { rounded: "xl", ratio: "3/2", height: "lg" },
          text: { color: "neutral-900" },
        },
      }}
    />
  </div>
);

export const DemoCertificateCard = () => (
  <div className="w-96">
    <ComposableCard
      {...{
        type: "card.composable",
        title: "Title certification",
        image: demoImage4,
        buttons: [{ label: "button", href: "/" }],
        theme: {
          card: {
            align: "center",
            effect: "grayscale",
            background: "white",
            border: "neutral-200",
            spacing: "lg",
          },
          title: { size: "md", color: "action-500" },
          image: { height: "sm" },
          buttons: { hidden: true },
        },
      }}
    />
  </div>
);

export const DemoDepartmentCard = () => (
  <div className="w-96">
    <ComposableCard
      {...{
        type: "card.composable",
        title: "Analytics",
        text: (
          <p>
            Lorem ipsum dolor sit amet, con sectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus.
          </p>
        ),
        image: demoImage3,
        buttons: [{ label: "Learn more", href: "/", variant: "secondary" }],
        theme: {
          card: { border: "neutral-200" },
          title: { size: "lg", color: "neutral-500" },
          text: { size: "md", color: "neutral-900" },
          image: { height: "sm", ratio: "1/1", rounded: "full" },
        },
      }}
    />
  </div>
);
