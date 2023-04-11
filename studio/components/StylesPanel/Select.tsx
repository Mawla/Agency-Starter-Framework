import { TriangleDownIcon } from "@radix-ui/react-icons";
import { CheckmarkIcon } from "@sanity/icons";
import { Text } from "@sanity/ui";
import React from "react";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";

type SelectProps = {
  options?: { title: string; value: string | null }[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  Icon?: React.ComponentType;
};

export const Select = ({
  options = [],
  value = null,
  onChange = (value) => {},
  Icon = TriangleDownIcon,
}: SelectProps) => {
  const popover = usePopoverState({ placement: "right-start", gutter: 1 });

  options = [
    {
      title: "Default",
      value: null,
    },
    ...options,
  ];

  return (
    <div>
      <PopoverDisclosure {...popover} className="stylespanel_popoverButton">
        <span className="stylespanel_preview">
          <Icon />
        </span>
      </PopoverDisclosure>

      <Popover
        {...popover}
        className="stylespanel_popover"
        aria-label="popover"
      >
        <div
          className={`stylespanel_select ${
            options?.length < 5
              ? "stylespanel_select--small"
              : "stylespanel_select--large"
          }`}
        >
          {options.map((item) => (
            <div
              className="stylespanel_selectOption"
              key={item.value}
              onClick={() => {
                onChange(item.value);
                popover.hide();
              }}
            >
              {value === item.value && (
                <span className="stylespanel_selectCheck">
                  <CheckmarkIcon />
                </span>
              )}
              <Text size={1}>{item.title}</Text>
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
};
