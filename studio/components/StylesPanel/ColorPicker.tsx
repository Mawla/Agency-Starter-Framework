import { optionsToList } from "../../utils/fields/optionsToList";
import styles from "./stylespanel.module.css";
import { Box, Flex, Stack, Text, Tooltip } from "@sanity/ui";
import cx from "classnames";
import React from "react";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import tinycolor from "tinycolor2";

type ColorPickerProps = {
  colors: { [key: string]: string };
  value: string;
  onChange: (value: null | string) => void;
};

export const ColorPicker = ({
  colors,
  value,
  onChange = () => {},
}: ColorPickerProps) => {
  const colorList: { title: string; value: null | string }[] = [
    { title: "Clear", value: null },
    ...optionsToList(colors),
  ];

  const currentColor = value
    ? colorList.find((color) => color.value === value)?.title
    : null;

  const popover = usePopoverState({ placement: "right-start", gutter: 1 });

  // group colors by category `pink-500` -> `pink`
  const colorRows: {
    [key: string]: { title: string; value: string | null }[];
  } = { misc: [] };
  colorList.forEach(({ title, value }) => {
    if (!value || value.indexOf("-") === -1 || colorList?.length < 12)
      return colorRows.misc.push({ title, value });
    const group = value.split("-")[0];
    if (!colorRows[group]) colorRows[group] = [];
    colorRows[group].push({ title, value });
  });

  return (
    <div>
      <PopoverDisclosure {...popover} className={styles.popoverButton}>
        <span
          className={cx(!value && styles.previewColorEmpty, styles.preview)}
          style={{
            backgroundColor: currentColor || "",
          }}
        />
      </PopoverDisclosure>

      <Popover {...popover} className={styles.popover} aria-label="popover">
        <Stack space={1} padding={2}>
          {Object.values(colorRows).map((colorList) => (
            <Flex gap={1} wrap="wrap" style={{ maxWidth: "75vw" }}>
              {colorList?.map((option) => {
                return (
                  <Tooltip
                    content={
                      <Box
                        padding={4}
                        style={{
                          backgroundColor:
                            value === "null" ? "white" : option.title,
                        }}
                      >
                        <Text
                          size={1}
                          style={{
                            color:
                              option.value === null
                                ? "black"
                                : tinycolor(option.title).isDark()
                                ? "white"
                                : "black",
                          }}
                        >
                          {option.value || "clear"}
                        </Text>
                      </Box>
                    }
                    placement="top"
                    portal
                  >
                    <button
                      onClick={() => {
                        popover.hide();
                        onChange(option.value);
                      }}
                      type="button"
                      aria-label={option.value || ""}
                      className={styles.colorItemWrapper}
                    >
                      <span
                        className={
                          option.value === null
                            ? value === null
                              ? styles.colorItemClearActive
                              : styles.colorItemClear
                            : value === option.value
                            ? styles.colorItemActive
                            : styles.colorItem
                        }
                        style={{
                          backgroundColor:
                            option.value === null
                              ? "transparent"
                              : option.title,
                        }}
                      />
                    </button>
                  </Tooltip>
                );
              })}
            </Flex>
          ))}
        </Stack>
      </Popover>
    </div>
  );
};
