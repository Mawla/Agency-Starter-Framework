import { COLORS } from "../../theme";
import { ColorType } from "../../types";
import { Background } from "../block/Background";
import {
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
} from "../block/background.options";
import { Text as TextComponent } from "./Text";
import {
  TextFontType,
  TextSizeType,
  TEXT_ALIGN_OPTIONS,
  TEXT_FONT_OPTIONS,
  TEXT_SIZE_OPTIONS,
} from "./text.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: TextComponent,
  title: "Components/Text",
} as Meta;

export const Text = () => (
  <div className="divide-y">
    {(Object.keys(TEXT_SIZE_OPTIONS) as TextSizeType[]).map(
      (size: TextSizeType) => (
        <div key={size} className="p-4">
          <TextComponent size={size}>
            <div className="p-1">Block text size {size}</div>
          </TextComponent>
        </div>
      ),
    )}

    {(Object.keys(TEXT_FONT_OPTIONS) as TextFontType[]).map(
      (font: TextFontType) => (
        <div key={font} className="p-4">
          <TextComponent font={font}>
            <div className="p-1">Block font {font}</div>
          </TextComponent>
        </div>
      ),
    )}

    {(
      Object.entries(TEXT_ALIGN_OPTIONS) as [
        key: keyof typeof TEXT_ALIGN_OPTIONS,
        label: string,
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

    {(Object.keys(COLORS) as ColorType[]).map((color: ColorType) => (
      <TextComponent color={color} background={color} key={color}>
        <div className="p-4">Text color {color}</div>
      </TextComponent>
    ))}
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color: BackgroundColorType) => (
        <Background theme={{ background: color }} key={color}>
          <TextComponent color="white" background={color}>
            <div className="p-4">Block background {color}</div>
          </TextComponent>
        </Background>
      ),
    )}
  </div>
);
