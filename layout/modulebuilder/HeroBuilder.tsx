import { HeroBasicProps } from "../../heroes/herobasic/HeroBasic";
import { ResourceHeroProps } from "../../heroes/resourcehero/ResourceHero";
import { GenericModuleProps } from "../../types";
import React, { lazy, Suspense, ComponentType } from "react";

const ResourceHero = lazy<ComponentType<ResourceHeroProps>>(
  () =>
    import(
      /* webpackChunkName: "ResourceHero" */ "../../heroes/resourcehero/ResourceHero"
    ),
);

const HeroBasic = lazy<ComponentType<HeroBasicProps>>(
  () =>
    import(
      /* webpackChunkName: "HeroBasic" */ "../../heroes/herobasic/HeroBasic"
    ),
);

export type HeroBuilderProps = {
  hero: GenericModuleProps;
};

export const HeroBuilder = ({ hero }: HeroBuilderProps) => {
  return (
    <Suspense fallback={``}>
      <section data-module={hero?._type} data-id={hero._key}>
        {hero._type == "hero.basic" && (
          <HeroBasic {...(hero as HeroBasicProps)} />
        )}
        {hero._type === "hero.resourcehero" && (
          <ResourceHero {...(hero as ResourceHeroProps)} />
        )}
      </section>
    </Suspense>
  );
};

export const HeroBuilderMemo = React.memo(HeroBuilder);
