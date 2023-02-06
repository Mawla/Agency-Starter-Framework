import { Meta } from "@storybook/react";
import React from "react";

import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { ColorType } from "../../types";
import { Background } from "./Background";
import {
  ALIGN_OPTIONS,
  FontType,
  FONT_OPTIONS,
  SizeType,
  SIZE_OPTIONS,
  Text as TextComponent,
} from "./Text";

export default {
  component: TextComponent,
  title: "Components/Module/Text",
} as Meta;

export const Text = () => (
  <div className="divide-y">
    {(Object.keys(SIZE_OPTIONS) as SizeType[]).map((size: SizeType) => (
      <div key={size} className="p-4">
        <TextComponent size={size}>
          <div className="p-1">Module text size {size}</div>
        </TextComponent>
      </div>
    ))}

    {(Object.keys(FONT_OPTIONS) as FontType[]).map((font: FontType) => (
      <div key={font} className="p-4">
        <TextComponent font={font}>
          <div className="p-1">Module font {font}</div>
        </TextComponent>
      </div>
    ))}

    {(
      Object.entries(ALIGN_OPTIONS) as [
        key: keyof typeof ALIGN_OPTIONS,
        label: string
      ][]
    ).map(([align, label]) => (
      <div key={label} className="p-4">
        <TextComponent align={align}>
          Unify all your conversations and documents - drag and drop Outlook
          emails and attachments into SharePoint, Teams or OneDrive. Add emails
          to conversations without leaving Teams.
        </TextComponent>
      </div>
    ))}

    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
      (color: ColorType) => (
        <Background theme={{ background: color }} key={color}>
          <TextComponent color="white" background={color}>
            <div className="p-4">Module background {color}</div>
          </TextComponent>
        </Background>
      )
    )}
  </div>
);
