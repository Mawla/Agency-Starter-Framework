import { DECORATION_LOCATION_OPTIONS } from "../../../components/decorations/decoration.options";
import { optionsToList } from "../../utils/fields/optionsToList";
import React from "react";
import { useFormValue } from "sanity";

export const DecorationLocationSelect = (props: any) => {
  const blockValue = useFormValue(props.path.slice(0, 2)) as any;

  const hasImage = blockValue?.image;
  const hasVideo = blockValue?.video;
  const hasOuterBlock =
    blockValue?.theme?.block?.outerBackground ||
    blockValue?.theme?.block?.margin?.top ||
    blockValue?.theme?.block?.margin?.bottom ||
    blockValue?.theme?.block?.width;

  const options = optionsToList(DECORATION_LOCATION_OPTIONS).filter(
    (option: { value: string }) => {
      // hide image field
      if (option.value === "image" && !hasImage && !hasVideo) {
        return false;
      }
      // hide outer block field
      if (option.value === "outside" && !hasOuterBlock) {
        return false;
      }

      return true;
    },
  );
  props.inputProps.schemaType.options = {};
  props.inputProps.schemaType.options.list = options;

  if (options.length <= 1) return null;

  return <div>{props.renderDefault(props)}</div>;
};
