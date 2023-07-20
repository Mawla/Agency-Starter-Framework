import { CloseIcon, SearchIcon } from "@sanity/icons";
import { Button, Select, Autocomplete } from "@sanity/ui";
import { nanoid } from "nanoid";
import React from "react";
import { ComponentType } from "react";
import { set, unset } from "sanity";
import colors from "tailwindcss/colors";

const ThemeColors: ComponentType<any> = (props) => {
  const importDefaults = (selectedValue: string) => {
    const colorSet = colors[selectedValue as keyof typeof colors];

    const newValue = Object.entries(colorSet).map(([name, value]) => ({
      name: `${selectedValue}-${name}`,
      value,
      _key: nanoid(),
    }));

    props.onChange(set([...(props.value || []), ...newValue]));
  };

  const clearAll = () => {
    props.onChange(unset([]));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 4 }}>
        <Autocomplete
          fontSize={1}
          padding={2}
          onSelect={importDefaults}
          icon={SearchIcon}
          id="color-search"
          options={
            Object.keys(colors)
              .filter(
                (color) =>
                  ![
                    "black",
                    "white",
                    "current",
                    "inherit",
                    "transparent",
                  ].includes(color),
              )
              .map((color) => ({ value: color })) as any
          }
          placeholder="Import color set"
          renderOption={(option) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  display: "inline-block",
                  marginRight: 4,
                  backgroundColor:
                    colors[option.value as keyof typeof colors][500],
                }}
              />
              {option.value}
            </div>
          )}
        />
        <Button
          fontSize={1}
          icon={CloseIcon}
          padding={2}
          text="Clear all"
          mode="ghost"
          tone="caution"
          onClick={clearAll}
        />
      </div>
      {props.renderDefault(props)}
    </div>
  );
};

export default ThemeColors;
