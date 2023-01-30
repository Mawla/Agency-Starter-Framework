import styles from "./stylespanel.module.css";
import { InputIcon } from "@radix-ui/react-icons";
import { TextInput as SanityTextInput } from "@sanity/ui";
import React from "react";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";

type TextInputProps = {
  value?: null | string;
  onChange: (value: null | string) => void;
};

export const TextInput = ({
  value = "",
  onChange = () => {},
}: TextInputProps) => {
  const popover = usePopoverState({ placement: "right-start", gutter: 1 });

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange(e.currentTarget?.value);
      popover.hide();
    }
  };

  return (
    <div>
      <PopoverDisclosure {...popover} className={styles.popoverButton}>
        <span className={styles.preview}>
          <InputIcon />
        </span>
      </PopoverDisclosure>

      <Popover {...popover} className={styles.popover} aria-label="popover">
        <div className={styles.textInput}>
          <SanityTextInput
            fontSize={1}
            onChange={(event) => {
              onChange(event.currentTarget.value);
            }}
            onKeyUp={handleKeyUp}
            padding={2}
            value={value as string}
          />
        </div>
      </Popover>
    </div>
  );
};
