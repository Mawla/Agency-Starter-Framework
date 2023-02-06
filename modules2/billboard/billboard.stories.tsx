import { demoImage2, demoImage4, demoImage5 } from "../../stories/content";
import { Billboard } from "./Billboard";
import { AlignType, ALIGN_OPTIONS } from "./BillboardOptions";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Billboard,
  title: "Modules/Billboard",
} as Meta;

export const Default = () => (
  <div className="flex flex-col gap-10">
    <Billboard
      eyebrow="Sports sponsorships"
      title="Descriptive headline lorem ipsum dolor "
      content={
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus.
        </p>
      }
      image={demoImage5}
      buttons={[{ label: "Button", variant: "primary" }]}
    />
    <Billboard
      eyebrow="Sports sponsorships"
      title="Descriptive headline lorem ipsum dolor "
      content={
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus.
        </p>
      }
      image={demoImage5}
      buttons={[{ label: "Button", variant: "primary" }]}
      theme={{
        image: { align: "left" },
      }}
    />
  </div>
);

export const NoStyles = () => (
  <Billboard
    eyebrow="Sports sponsorships"
    title="Descriptive headline lorem ipsum dolor "
    content={
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
        elit sed risus.
      </p>
    }
    image={demoImage5}
    buttons={[{ label: "Button" }]}
  />
);

export const LongContent = () => (
  <Billboard
    eyebrow="Sports sponsorships"
    title="Descriptive headline lorem ipsum dolor Descriptive headline lorem ipsum dolor "
    content={
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus.
        </p>
      </>
    }
    image={demoImage5}
    buttons={[{ label: "Button", variant: "primary" }]}
  />
);

export const ShortContent = () => (
  <Billboard
    eyebrow="Sports sponsorships"
    title="Headline"
    content={<p>…</p>}
    image={demoImage5}
  />
);

export const NoImage = () => (
  <Billboard
    eyebrow="Sports sponsorships"
    title="Headline"
    content={<p>…</p>}
  />
);

export const LogoImage = () => (
  <Billboard
    eyebrow="Sports sponsorships"
    title="Headline"
    content={
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
        elit sed risus.
      </p>
    }
    image={demoImage4}
  />
);

export const NonTransparentImage = () => (
  <Billboard
    eyebrow="Sports sponsorships"
    title="Headline"
    content={
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
        elit sed risus.
      </p>
    }
    image={demoImage2}
  />
);

export const NoContent = () => <Billboard image={demoImage5} />;

export const Content = () => (
  <Billboard
    title="Billboard"
    content={
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
        elit sed risus.
      </p>
    }
  />
);

export const Alignments = () => (
  <div>
    {(Object.keys(ALIGN_OPTIONS) as AlignType[]).map((align: AlignType) => (
      <Billboard
        theme={{
          image: { align },
        }}
        image={demoImage5}
        title="Descriptive headline lorem ipsum dolor"
        buttons={[{ label: "Button", variant: "primary" }]}
        content={
          <p>
            WLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus.
          </p>
        }
      />
    ))}
  </div>
);

export const CustomSpace = () => (
  <div className="border">
    <Billboard
      image={demoImage5}
      theme={{
        module: {
          space: { top: "sm", bottom: "xl" },
        },
      }}
    />
  </div>
);
