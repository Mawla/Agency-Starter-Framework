import { Select } from "./Select";
import { PinBottomIcon, PinTopIcon } from "@radix-ui/react-icons";
import { Stack } from "@sanity/ui";
import React, { useCallback } from "react";

type SpacePropsType = {
  options?: { title: string; value: string }[];
  value: { top?: string | null; bottom?: string | null };
  onChange: (value: { top?: string | null; bottom?: string | null }) => void;
};

export const Space = ({
  options = [],
  value = { top: null, bottom: null },
  onChange = (value) => {},
}: SpacePropsType) => {
  const handleChange = useCallback(
    (key: "top" | "bottom", newValue: string | null) => {
      onChange({
        ...value,
        [key]: newValue,
      });
    },
    [value]
  );

  return (
    <Stack space={1}>
      <Select
        options={options}
        value={value?.top}
        onChange={(value) => handleChange("top", value)}
        Icon={PinTopIcon}
      />
      <Select
        options={options}
        value={value?.bottom}
        onChange={(value) => handleChange("bottom", value)}
        Icon={PinBottomIcon}
      />
    </Stack>
  );
};
