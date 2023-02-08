import { CheckIcon, BorderSolidIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Button } from "reakit/Button";
import { Checkbox } from "reakit/Checkbox";

type ToggleProps = {
  value: null | boolean;
  onChange: (value: null | boolean) => void;
};

export const Toggle = ({ value, onChange = () => {} }: ToggleProps) => {
  const [checked, setChecked] = useState<boolean | null>(value);

  const toggle = () => {
    let newChecked: null | boolean = !checked;
    if (checked === false) newChecked = null;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <Checkbox
      as={Button}
      checked={Boolean(checked)}
      onChange={toggle}
      className="stylespanel_preview"
    >
      {checked === true && <CheckIcon />}
      {checked === false && <BorderSolidIcon />}
    </Checkbox>
  );
};
