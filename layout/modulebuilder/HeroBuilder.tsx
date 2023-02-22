import { HeroSplitProps } from "../../heroes/herosplit/HeroSplit";
import { ResourceHeroProps } from "../../heroes/resourcehero/ResourceHero";
import { GenericModuleProps } from "../../types";
import React, { lazy, Suspense, ComponentType } from "react";

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
  hero: GenericModuleProps;
};

export const HeroBuilder = ({ hero }: HeroBuilderProps) => {
  return (
    <Suspense fallback={``}>
      <section data-module={hero?._type} data-id={hero._key} key={hero._key}>
        {hero._type == "hero.basic" && (
          <HeroSplit {...(hero as HeroSplitProps)} />
        )}
        {hero._type === "hero.resourcehero" && (
          <ResourceHero {...(hero as ResourceHeroProps)} />
        )}
      </section>
    </Suspense>
  );
};

export const HeroBuilderMemo = React.memo(HeroBuilder);
