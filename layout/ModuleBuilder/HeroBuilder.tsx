import { GenericModuleProps } from "../../types";
import dynamic from "next/dynamic";
import React from "react";
import { Suspense } from "react";

const HeroBasic = dynamic<GenericModuleProps>(
  () =>
    import(/* webpackChunkName: "HeroBasic" */ "../../heroes/HeroBasic") as any
);

export type HeroBuilderProps = {
  hero: GenericModuleProps;
};

export const HeroBuilder = ({ hero }: HeroBuilderProps) => {
  return (
    <Suspense fallback={``}>
      {hero._type == "hero.basic" && <HeroBasic {...hero} />}
    </Suspense>
  );
};

export const HeroBuilderMemo = React.memo(HeroBuilder);
