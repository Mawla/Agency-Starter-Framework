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
  item: GenericModuleProps;
};

export const HeroBuilder = ({ item }: HeroBuilderProps) => {
  return (
    <Suspense fallback={``}>
      <section data-module={item?._type} data-id={item._key} key={item._key}>
        {item._type == "hero.basic" && (
          <HeroBasic {...(item as HeroBasicProps)} />
        )}
        {item._type === "hero.resourcehero" && (
          <ResourceHero {...(item as ResourceHeroProps)} />
        )}
      </section>
    </Suspense>
  );
};

export const HeroBuilderMemo = React.memo(HeroBuilder);
