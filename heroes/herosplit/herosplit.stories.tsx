import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { ColorType } from "../../types";
import { HeroSplit } from "./HeroSplit";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: HeroSplit,
  title: "Hero/HeroSplit",
} as Meta;

export const Default = () => (
  <HeroSplit
    title="Hello"
    text={
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    }
    buttons={[
      {
        label: "get some inspiration",
      },
    ]}
  />
);

export const Colors = () => (
  <>
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[])
      .reverse()
      .map((color1: ColorType) =>
        (Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
          (color2: ColorType) => (
            <div key={color1 + color2} className="mb-10">
              <HeroSplit
                title="Hello."
                buttons={[
                  {
                    label: "get some inspiration",
                  },
                ]}
              />
            </div>
          ),
        ),
      )}
  </>
);

export const NoContent = () => <HeroSplit />;
