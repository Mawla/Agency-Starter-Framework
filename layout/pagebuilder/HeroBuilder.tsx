import { HeroSplitProps } from "../../heroes/herosplit/HeroSplit";
import { HeroVerticalProps } from "../../heroes/herovertical/HeroVertical";
import { ResourceHeroProps } from "../../heroes/resourcehero/ResourceHero";
import { GenericModuleProps } from "../../types";
import React, { lazy, Suspense, ComponentType } from "react";

const HeroVertical = lazy<ComponentType<HeroVerticalProps>>(
  () =>
    import(
      /* webpackChunkName: "HeroVertical" */ "../../heroes/herovertical/HeroVertical"
    ),
);

const ResourceHero = lazy<ComponentType<ResourceHeroProps>>(
  () =>
    import(
      /* webpackChunkName: "ResourceHero" */ "../../heroes/resourcehero/ResourceHero"
    ),
);

const HeroSplit = lazy<ComponentType<HeroSplitProps>>(
  () =>
    import(
      /* webpackChunkName: "HeroSplit" */ "../../heroes/herosplit/HeroSplit"
    ),
);

export type HeroBuilderProps = {
  item: GenericModuleProps;
};

export const HeroBuilder = ({ item }: HeroBuilderProps) => {
  return (
    <Suspense fallback={``}>
      <section data-module={item?._type} data-id={item._key} key={item._key}>
        {item._type == "hero.herosplit" && (
          <HeroSplit {...(item as HeroSplitProps)} />
        )}
        {item._type === "hero.resourcehero" && (
          <ResourceHero {...(item as ResourceHeroProps)} />
        )}
        {item._type === "hero.herovertical" && (
          <HeroVertical {...(item as HeroVerticalProps)} />
        )}
      </section>
    </Suspense>
  );
};

export const HeroBuilderMemo = React.memo(HeroBuilder);
