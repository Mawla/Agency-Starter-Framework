import { Meta } from "@storybook/react";
import React from "react";

import { SPACE_OPTIONS } from "../../components/module/SpacingOptions";
import { WidthType, WIDTH_OPTIONS } from "../../components/module/WidthOptions";
import { demoImage2 } from "../../stories/content";
import { RichText } from "./RichText";
import {
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  TextAlignType,
  TEXT_ALIGN_OPTIONS,
} from "./RichTextOptions";

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
  <RichText eyebrow="hello" title="Prima" content={demoContent} />
);

export const ModuleBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color: BackgroundColorType) => (
        <RichText
          key={color}
          content={demoContent}
          eyebrow="hello"
          title="prima"
          theme={{ module: { background: color } }}
        />
      )
    )}
  </>
);

export const ModuleDecorationsOnes = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color: BackgroundColorType) => (
        <RichText
          content={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus
              luctus enim egestas , ac scelerisque ante pulvinar. Donec ut
              rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur
              vel bibendum lorem. Morbi convallis convallis diam sit amet
              lacinia. Aliquam in elementum tellus.
            </p>
          }
          eyebrow="Corporate"
          title="Descriptive statement lorem ipsum dolor sit amet"
          theme={{
            module: { background: color, align: "center" },
            decorations: { showOnes: true },
          }}
        />
      )
    )}
  </>
);

export const ModuleDecorationsLozenges = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color: BackgroundColorType) => (
        <RichText
          content={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus
              luctus enim egestas , ac scelerisque ante pulvinar. Donec ut
              rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur
              vel bibendum lorem. Morbi convallis convallis diam sit amet
              lacinia. Aliquam in elementum tellus.
            </p>
          }
          eyebrow="Corporate"
          title="Descriptive statement lorem ipsum dolor sit amet"
          theme={{
            module: { background: color, align: "center" },
            decorations: { showLozenges: true },
          }}
        />
      )
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
      )
    )}
  </div>
);

export const Widths = () => (
  <div>
    {(Object.keys(WIDTH_OPTIONS) as WidthType[]).map((width: WidthType) => (
      <RichText
        theme={{
          module: { width, background: "brand-base" },
          decorations: { showOnes: true },
        }}
        content={<p>{width}</p>}
      />
    ))}
  </div>
);

export const ModuleSpacing = () => (
  <>
    {(
      Object.entries(SPACE_OPTIONS) as [
        key: keyof typeof SPACE_OPTIONS,
        label: string
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
                background: "neutral-95",
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
                background: "neutral-95",
                space: { top: size, bottom: size },
              },
            }}
          />
        </div>
      </>
    ))}
  </>
);

export const PullUp = () => (
  <div>
    <RichText
      eyebrow="Institutional brief description"
      title="Descriptive statement lorem ipsum dolor sit amet"
      content={
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Praesent auctor purus luctus enim egestas , ac scelerisque
          ante pulvinar
        </p>
      }
      theme={{
        module: {
          background: "neutral-95",
          pullUp: true,
          align: "center",
          space: { top: "none", bottom: "none" },
        },
        decorations: { showOnes: true },
      }}
    />
    <RichText
      eyebrow="People / structure"
      title="Descriptive statement lorem ipsum dolor sit amet"
      content={
        <>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra.
          </p>
          <p>
            <img src={demoImage2.src} />
          </p>
        </>
      }
      theme={{
        module: {
          width: "inner",
          pullUp: true,
          align: "center",
          background: "brand-base",
          space: { top: "none", bottom: "none" },
        },
      }}
    />
    <RichText
      content={
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla
        </p>
      }
      theme={{
        module: {
          width: "outer",
          align: "center",
          background: "blue-dark",
          space: { top: "none", bottom: "none" },
        },
      }}
    />
  </div>
);
