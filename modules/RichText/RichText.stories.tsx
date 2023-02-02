import { SPACE_OPTIONS } from "../../components/module/SpacingOptions";
import { demoImage2 } from "../../stories/content";
import { RichText } from "./RichText";
import {
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  TextAlignType,
  TEXT_ALIGN_OPTIONS,
} from "./RichTextOptions";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: RichText,
  title: "Modules/RichText",
} as Meta;

const demoContent = (
  <div>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <p>
      Knight Rider, a <strong>shadowy flight</strong> into the dangerous world{" "}
      <em>of a man who does not exist</em>. Michael Knight, a young loner on a
      crusade to <a href="">champion the cause</a> of the innocent, the helpless
      in a world of criminals who operate above the law.
    </p>
    <ul>
      <li>List item</li>
      <li>
        List item
        <ul>
          <li>List item</li>
          <li>List item</li>
          <li>
            <a href="">List item</a>
          </li>
        </ul>
      </li>
      <li>List item</li>
    </ul>
    <p>
      <img src={demoImage2.src} />
    </p>
    <ol>
      <li>List item</li>
      <li>
        List item
        <ul>
          <li>List item</li>
          <li>
            <a href="">List item</a>
          </li>
          <li>List item</li>
        </ul>
      </li>
      <li>List item</li>
    </ol>
  </div>
);

export const Default = () => (
  <RichText eyebrow="hello" title="Hello" content={demoContent} />
);

export const ModuleBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color: BackgroundColorType) => (
        <RichText
          key={color}
          content={demoContent}
          eyebrow="hello"
          title="Hello"
          theme={{ module: { background: color } }}
        />
      ),
    )}
  </>
);

export const Alignments = () => (
  <div>
    {(Object.keys(TEXT_ALIGN_OPTIONS) as TextAlignType[]).map(
      (align: TextAlignType) => (
        <RichText
          theme={{
            module: { align },
          }}
          content={demoContent}
        />
      ),
    )}
  </div>
);

export const ModuleSpacing = () => (
  <>
    {(
      Object.entries(SPACE_OPTIONS) as [
        key: keyof typeof SPACE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <>
        <div key={size} className="border">
          <RichText
            content={<p>{label}</p>}
            theme={{ module: { space: { top: size, bottom: size } } }}
          />
        </div>
        <div key={size} className="border">
          <RichText
            content={<p>{label} / inner</p>}
            theme={{
              module: {
                background: "neutral-100",
                width: "inner",
                space: { top: size, bottom: size },
              },
            }}
          />
        </div>
        <div key={size} className="border">
          <RichText
            content={<p>{label} / full</p>}
            theme={{
              module: {
                background: "neutral-100",
                space: { top: size, bottom: size },
              },
            }}
          />
        </div>
      </>
    ))}
  </>
);
