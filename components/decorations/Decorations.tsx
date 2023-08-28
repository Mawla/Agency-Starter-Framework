import { DecorationProps } from "./Decoration";
import { DecorationLocationType } from "./decoration.options";
import { ComponentType, lazy } from "react";

export type DecorationsProps = {
  location?: DecorationLocationType;
  decorations?: DecorationProps[];
};

const Decoration = lazy<ComponentType<DecorationProps>>(
  () => import(/* webpackChunkName: "Decoration" */ "./Decoration"),
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
        .map((decoration) => (
          <Decoration
            {...decoration}
            key={decoration._key}
            _key={decoration._key}
          />
        ))}
    </>
  );
};

export default Decorations;
