import { GenericModuleProps } from "../../types";
import dynamic from "next/dynamic";
import React from "react";
import { Suspense } from "react";

const HeroBasic = dynamic<GenericModuleProps>(
  () =>
    import(
      /* webpackChunkName: "HeroBasic" */ "../../heroes/HeroBasic/HeroBasic"
    ) as any,
);

export type HeroBuilderProps = {
  hero: GenericModuleProps;
};

export const HeroBuilder = ({ hero }: HeroBuilderProps) => {
  return (
    <Suspense fallback={``}>
      <div data-module={hero?._type} data-id={hero._key}>
        {hero._type == "hero.basic" && <HeroBasic {...hero} />}
      </div>
    </Suspense>
  );
};

export const HeroBuilderMemo = React.memo(HeroBuilder);
