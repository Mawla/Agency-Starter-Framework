import { HeroBasicProps } from "../../heroes/herobasic/HeroBasic";
import { GenericModuleProps } from "../../types";
import React, { lazy, Suspense, ComponentType } from "react";

const HeroBasic = lazy<ComponentType<HeroBasicProps>>(
  () =>
    import(
      /* webpackChunkName: "HeroBasic" */ "../../heroes/HeroBasic/HeroBasic"
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
      </section>
    </Suspense>
  );
};

export const HeroBuilderMemo = React.memo(HeroBuilder);
