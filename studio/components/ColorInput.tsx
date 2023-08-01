import { useDebounce } from "../../hooks/useDebounce";
import { Stack } from "@sanity/ui";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { set } from "sanity";

export const ColorInput = (props: any) => {
  const [color, setColor] = useState("");
  useDebounce(color, 200, (value: string) => {
    if (!value) return;
    props.onChange(set(value));
  });

  return (
    <Stack space={2}>
      {props.renderDefault(props)}

      <HexColorPicker color={props.value || "#ffffff"} onChange={setColor} />
    </Stack>
  );
};
