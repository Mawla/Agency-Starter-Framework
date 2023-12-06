import { CSSDecorationProps } from "./CSSDecoration";
import { DecorationProps } from "./Decoration";
import { DecorationLocationType } from "./decoration.options";
import { ComponentType, lazy } from "react";

export type DecorationsProps = {
  location?: DecorationLocationType;
  decorations?: (DecorationProps | CSSDecorationProps)[];
};

const Decoration = lazy<ComponentType<DecorationProps>>(
  () => import(/* webpackChunkName: "Decoration" */ "./Decoration"),
);

const CSSDecoration = lazy<ComponentType<CSSDecorationProps>>(
  () => import(/* webpackChunkName: "CSSDecoration" */ "./CSSDecoration"),
);

export const Decorations = ({ decorations, location }: DecorationsProps) => {
  if (!decorations?.filter(Boolean)?.length) return null;

  return (
    <>
      {decorations
        ?.filter((decoration) => {
          if (!location) return true;
          return decoration.location === location;
        })
        .map((decoration) => {
          if (decoration._type === "cssdecoration") {
            return (
              <CSSDecoration
                {...decoration}
                key={decoration._key}
                _key={decoration._key}
              />
            );
          } else if (
            decoration._type === "decoration" ||
            decoration._type == "decorationWrapper"
          ) {
            return (
              <Decoration
                {...decoration}
                key={decoration._key}
                _key={decoration._key}
              />
            );
          }
          return null;
        })}
    </>
  );
};

export default Decorations;
