import {
  demoImage,
  demoImage2,
  demoImage3,
  demoImage4,
} from "../../stories/content";
import { CardGrid } from "./CardGrid";
import { ComposableCardProps } from "./ComposableCard";
import { ImageCardProps } from "./ImageCard";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: CardGrid,
  title: "Modules/CardGrid/CardGrid",
} as Meta;

const DEMO_CONTENT = {
  eyebrow: "Team work statement",
  title:
    "Descriptive statement lorem ipsum dolor sit amet consect etur adipiscing elit",
  intro: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
      molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
      accumsan, risus sem sollicitudin lacus. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
    </p>
  ),
  buttons: [{ label: "button" }],
};

export const DemoStatCardGrid = () => (
  <CardGrid
    {...DEMO_CONTENT}
    theme={{
      module: {
        align: "center",
      },
      grid: {
        gapHorizontal: "lg",
        gapVertical: "xl",
        columns: 3,
      },
    }}
    items={new Array(6).fill({
      type: "card.composable",
      title: "2.5m+",
      subtitle: "Over 2.5 million customers",
      text: (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus.
        </p>
      ),
      theme: {
        title: {
          size: "4xl",
          color: "brand-base",
        },
        subtitle: {
          size: "lg",
        },
        text: { size: "md" },
      },
    } as ComposableCardProps)}
  />
);

export const DemoIconCardGrid = () => (
  <CardGrid
    title="Join our team"
    eyebrow="Strengths of our team"
    theme={{
      module: {
        align: "center",
      },
      grid: {
        gapHorizontal: "md",
        gapVertical: "xl",
        columns: 3,
      },
    }}
    items={
      [
        {
          type: "card.composable",
          title:
            "Continuous technical and legal training for all team members.",
          icon: "demo",
          theme: {
            card: { align: "center", shadow: true, border: "neutral-85" },
            title: { size: "lg" },
            icon: { size: "lg" },
          },
        },
        {
          type: "card.composable",
          title: "Innovative, highly digital and international workplace.",
          icon: "demo",
          theme: {
            card: { align: "center", shadow: true, border: "neutral-85" },
            title: { size: "lg" },
            icon: { size: "lg" },
          },
        },
        {
          type: "card.composable",
          title: "Close-knit team and young and informal workplace.",
          icon: "demo",
          theme: {
            card: { align: "center", shadow: true, border: "neutral-85" },
            title: { size: "lg" },
            icon: { size: "lg" },
          },
        },
      ] as ComposableCardProps[]
    }
  />
);

export const DemoBenefitsCardGrid = () => (
  <CardGrid
    title="Lorem ipsum"
    eyebrow="Benefits"
    theme={{
      grid: {
        gapHorizontal: "md",
        gapVertical: "md",
        columns: 3,
        stagger: true,
      },
    }}
    items={
      [
        {
          type: "card.composable",
          title: "Benefit title",
          text: (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a mattis tellus.
            </p>
          ),
          icon: "demo",
          theme: {
            card: { background: "neutral-95" },
            title: { size: "md", color: "neutral-base" },
            icon: { size: "sm", color: "brand-base" },
            text: { color: "neutral-25" },
          },
        },
        {
          type: "card.composable",
          title: "Benefit title",
          text: (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a mattis tellus.
            </p>
          ),
          icon: "demo",
          theme: {
            card: { background: "brand-light" },
            title: { size: "md", color: "neutral-base" },
            icon: { size: "sm", color: "brand-dark" },
            text: { color: "neutral-25" },
          },
        },
        {
          type: "card.composable",
          title: "Benefit title",
          text: (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a mattis tellus.
            </p>
          ),
          icon: "demo",
          theme: {
            card: { background: "brand-dark" },
            title: { size: "md", color: "white" },
            icon: { size: "sm", color: "white" },
            text: { color: "white" },
          },
        },
        {
          type: "card.composable",
          title: "Benefit title",
          text: (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a mattis tellus.
            </p>
          ),
          icon: "demo",
          theme: {
            card: { background: "brand-light" },
            title: { size: "md", color: "neutral-base" },
            icon: { size: "sm", color: "brand-dark" },
            text: { color: "neutral-25" },
          },
        },
        {
          type: "card.composable",
          title: "Benefit title",
          text: (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a mattis tellus.
            </p>
          ),
          icon: "demo",
          theme: {
            card: { background: "brand-base" },
            title: { size: "md", color: "white" },
            icon: { size: "sm", color: "white" },
            text: { color: "white" },
          },
        },
        {
          type: "card.composable",
          title: "Benefit title",
          text: (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a mattis tellus.
            </p>
          ),
          icon: "demo",
          theme: {
            card: { background: "neutral-95" },
            title: { size: "md", color: "neutral-base" },
            icon: { size: "sm", color: "brand-base" },
            text: { color: "neutral-25" },
          },
        },
      ] as ComposableCardProps[]
    }
  />
);

export const DemoProcessCardGrid = () => (
  <CardGrid
    title="Descriptive statement lorem ipsum dolor sit "
    eyebrow="Our hiring process"
    intro={
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit etiam eu turpis
        molestie, dictum est a, mattis tellus. Etiam eu turpis molestie, dictum
        est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
        sem sollicitudin lacus, ut interdum tellus elit sed risus ipsum dolor.{" "}
      </p>
    }
    theme={{
      module: {
        align: "center",
      },
      grid: {
        gapHorizontal: "md",
        stagger: true,
        columns: 4,
      },
      slider: {
        mobile: true,
        desktop: true,
      },
    }}
    items={new Array(6).fill({
      type: "card.composable",
      title: "x",
      subtitle: "Stage title",
      text: (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a mattis tellus.
        </p>
      ),
      theme: {
        card: { background: "brand-light" },
        title: { size: "4xl", color: "brand-base" },
        text: { color: "neutral-25" },
      },
    } as ComposableCardProps)}
  />
);

export const DemoFacilityCardGrid = () => (
  <CardGrid
    title="Lorem ipsum"
    eyebrow="Facilities"
    theme={{
      grid: {
        gapHorizontal: "md",
        gapVertical: "md",
        columns: 3,
        stagger: true,
      },
    }}
    items={
      [
        {
          type: "card.composable",
          title: "Facility",
          text: (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a mattis tellus.
            </p>
          ),
          cover: demoImage,
          theme: {
            card: { background: "green-light" },
            title: { size: "md", color: "neutral-base" },
            text: { color: "neutral-25" },
          },
        },
        {
          type: "card.composable",
          title: "Facility",
          text: (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a mattis tellus.
            </p>
          ),
          cover: demoImage,
          theme: {
            card: { background: "brand-light" },
            title: { size: "md", color: "neutral-base" },
            text: { color: "neutral-25" },
          },
        },
        {
          type: "card.composable",
          title: "Facility",
          text: (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a mattis tellus.
            </p>
          ),
          cover: demoImage,
          theme: {
            card: { background: "brand-dark" },
            title: { size: "md", color: "white" },
            text: { color: "white" },
          },
        },
        {
          type: "card.composable",
          title: "Facility",
          text: (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a mattis tellus.
            </p>
          ),
          cover: demoImage,
          theme: {
            card: { background: "neutral-95" },
            title: { size: "md", color: "neutral-base" },
            text: { color: "neutral-25" },
          },
        },
        {
          type: "card.composable",
          title: "Facility",
          text: (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a mattis tellus.
            </p>
          ),
          cover: demoImage,
          theme: {
            card: { background: "brand-base" },
            title: { size: "md", color: "white" },
            text: { color: "white" },
          },
        },
        {
          type: "card.composable",
          title: "Facility",
          text: (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a mattis tellus.
            </p>
          ),
          cover: demoImage,
          theme: {
            card: { background: "blue-light" },
            title: { size: "md", color: "neutral-base" },
            text: { color: "neutral-25" },
          },
        },
      ] as ComposableCardProps[]
    }
  />
);

export const DemoDepartmentCardGrid = () => (
  <CardGrid
    title="Lorem ipsum"
    eyebrow="Departments"
    theme={{
      grid: {
        gapHorizontal: "lg",
        gapVertical: "lg",
        columns: 3,
      },
    }}
    items={
      new Array(6).fill({
        type: "card.composable",
        title: "Analytics",
        text: (
          <p>
            Lorem ipsum dolor sit amet, con sectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus.
          </p>
        ),
        image: demoImage3,
        buttons: [{ label: "Learn more", href: "/", variant: "secondary" }],
        theme: {
          card: { border: "neutral-85" },
          title: { size: "lg", color: "neutral-base" },
          text: { size: "md", color: "neutral-25" },
          image: { height: "sm", ratio: "1/1", rounded: "full" },
        },
      }) as ComposableCardProps[]
    }
  />
);

export const DemoDepartmentCardSlider = () => (
  <CardGrid
    title="Lorem ipsum"
    eyebrow="Departments"
    theme={{
      grid: {
        gapHorizontal: "lg",
        gapVertical: "lg",
        columns: 3,
      },
      slider: {
        mobile: true,
        desktop: true,
      },
    }}
    items={
      new Array(6).fill({
        type: "card.composable",
        title: "Analytics",
        text: (
          <p>
            Lorem ipsum dolor sit amet, con sectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus.
          </p>
        ),
        image: demoImage3,
        buttons: [{ label: "Learn more", href: "/", variant: "secondary" }],
        theme: {
          card: { border: "neutral-85" },
          title: { size: "lg", color: "neutral-base" },
          text: { size: "md", color: "neutral-25" },
          image: { height: "sm", ratio: "1/1", rounded: "full" },
        },
      }) as ComposableCardProps[]
    }
  />
);

export const DemoPeopleCardGrid = () => (
  <CardGrid
    title="Lorem ipsum"
    eyebrow="People"
    theme={{
      module: {
        background: "neutral-95",
        align: "center",
      },
      grid: {
        gapHorizontal: "sm",
        gapVertical: "lg",
        columns: 3,
      },
    }}
    items={
      new Array(6).fill({
        type: "card.composable",
        title: "Name Surname",
        subtitle: "Prima position",
        text: (
          <p>
            Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
            lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
            velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos. Praesent
            auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
            Donec ut rhoncus ex.
          </p>
        ),
        image: demoImage,
        theme: {
          title: { size: "md", color: "brand-base" },
          subtitle: { size: "md", color: "neutral-base", weight: "book" },
          image: { rounded: "xl", ratio: "3/2", height: "lg" },
          text: { color: "neutral-25" },
        },
      }) as ComposableCardProps[]
    }
  />
);

export const DemoPressReleasesCardGrid = () => (
  <CardGrid
    title="Lorem ipsum"
    eyebrow="Press releases"
    theme={{
      grid: {
        stagger: true,
        gapHorizontal: "md",
        gapVertical: "md",
        columns: 3,
      },
    }}
    items={
      new Array(6).fill({
        type: "card.composable",
        title: "Press release title two lorem ipsum dolor sit amet",
        badge: "26 Sept 2022",
        cover: demoImage3,
        buttons: [
          {
            label: "Read press release",
            href: "/",
            variant: "tertiary",
            alt: true,
          },
        ],
        theme: {
          card: { background: "neutral-95" },
          title: { size: "md", color: "neutral-base" },
          text: { size: "md", color: "neutral-25" },
          badge: { variant: "neutral", alt: true },
        },
      }) as ComposableCardProps[]
    }
  />
);

export const DemoObjectivesCardGrid = () => (
  <CardGrid
    title="Lorem ipsum"
    eyebrow="Objectives"
    theme={{
      grid: {
        gapHorizontal: "md",
        gapVertical: "md",
        columns: 3,
      },
    }}
    items={
      new Array(6).fill({
        type: "card.composable",
        title: "Objective",
        image: demoImage3,
        text: (
          <p>
            Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
            lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
            velit, sit amet feugiat lectus.
          </p>
        ),
        theme: {
          title: { size: "md", color: "neutral-base" },
          text: { size: "md", color: "neutral-25" },
          image: { ratio: "1/1", height: "lg", rounded: "sm" },
        },
      }) as ComposableCardProps[]
    }
  />
);

export const DemoInvestorCardGrid = () => (
  <CardGrid
    title="Lorem ipsum"
    eyebrow="Objectives"
    theme={{
      grid: {
        gapHorizontal: "lg",
        gapVertical: "lg",
        columns: 3,
      },
      slider: {
        mobile: true,
        desktop: true,
      },
    }}
    items={
      new Array(6).fill({
        type: "card.composable",
        title: "Milestone",
        image: demoImage2,
        badge: 2023,
        text: (
          <p>
            Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
            lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
            velit, sit amet feugiat lectus.
          </p>
        ),
        theme: {
          card: { border: "neutral-85" },
          title: { size: "md", color: "neutral-base" },
          text: { size: "md", color: "neutral-25" },
          image: { ratio: "auto", height: "md" },
          badge: { variant: "brand" },
        },
      }) as ComposableCardProps[]
    }
  />
);

export const DemoContactCardGrid = () => (
  <CardGrid
    title="Lorem ipsum"
    eyebrow="Contact"
    intro={
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus.{" "}
      </p>
    }
    theme={{
      module: { background: "neutral-95", align: "center" },
      grid: {
        gapHorizontal: "lg",
        gapVertical: "lg",
        columns: 4,
      },
      slider: {
        mobile: false,
        desktop: false,
      },
    }}
    items={[
      {
        type: "card.composable",
        title: "Corporate Address",
        text: (
          <p>
            Prima Assicurazioni S.p.A. Piazzale Loreto 17, 20131 Milano (MI)
            Italy
          </p>
        ),
      },
      {
        type: "card.composable",
        title: "Investor Relations",
        text: (
          <>
            <p>
              Description of when to get in touch dignis metus nec fringilla
              accumsan, risus sem sollicitudin.
            </p>

            <p>
              <strong>Name Surname</strong>
              <br />
              <a href="">example@prima.it</a>
            </p>
          </>
        ),
      },
      {
        type: "card.composable",
        title: "Media",
        text: <p></p>,
      },
      {
        type: "card.composable",
        title: "HR",
        text: <p></p>,
      },
      {
        type: "card.composable",
        title: "Customer Support",
        text: (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus.
          </p>
        ),
      },
      {
        type: "card.composable",
        title: "Italy ",
        text: (
          <>
            <p>
              <strong>Sales contact</strong>
              <br />
              020 1234 5678
              <br />
              <a href="">example@prima.it</a>
            </p>

            <p>
              <strong>Claims contact</strong>
              <br />
              020 1234 5678
              <br />
              <a href="">example@prima.it</a>
            </p>
          </>
        ),
      },
      {
        type: "card.composable",
        title: "UK ",
        text: <p></p>,
      },
      {
        type: "card.composable",
        title: "Spain ",
        text: <p></p>,
      },
    ]}
  />
);

export const DemoMediaCardSlider = () => (
  <CardGrid
    title="Descriptive statement lorem ipsum dolor sit amet"
    eyebrow="Media carousel"
    theme={{
      module: { background: "brand-dark", align: "center" },
      slider: {
        mobile: true,
        desktop: true,
        color: "white",
      },
      grid: {
        gapHorizontal: "md",
        gapVertical: "md",
        columns: 4,
      },
    }}
    items={
      new Array(6).fill({
        type: "card.composable",
        title: "Media title",
        badge: "26 Sep",
        cover: demoImage,
        buttons: [
          { label: "Read article", href: "/", variant: "tertiary", alt: true },
        ],
        theme: {
          card: { background: "white" },
          title: { size: "md", color: "neutral-base" },
          badge: { variant: "neutral" },
        },
      }) as ComposableCardProps[]
    }
  />
);

export const DemoHistoryCardSlider = () => (
  <CardGrid
    title="Descriptive statement lorem ipsum dolor sit amet"
    eyebrow="Our history"
    theme={{
      module: { background: "neutral-95", align: "center" },
      slider: {
        mobile: true,
        desktop: true,
      },
      grid: {
        gapHorizontal: "md",
        gapVertical: "md",
        columns: 4,
      },
    }}
    items={
      new Array(6).fill({
        type: "card.composable",
        title: "2022",
        subtitle: "Lorem ipsum",
        text: (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit.
          </p>
        ),
        cover: demoImage,
        theme: {
          card: { background: "white" },
          title: { size: "xl", color: "brand-base" },
        },
      }) as ComposableCardProps[]
    }
  />
);

export const DemoCorporateValuesCardSlider = () => (
  <CardGrid
    title="Descriptive statement lorem ipsum dolor sit amet"
    eyebrow="Corporate Values"
    theme={{
      module: { background: "brand-dark", align: "center" },
      slider: {
        mobile: true,
        desktop: true,
        color: "white",
      },
      grid: {
        gapHorizontal: "md",
        gapVertical: "md",
        columns: 4,
      },
    }}
    items={
      new Array(6).fill({
        type: "card.composable",
        title: "1",
        subtitle: "Lorem ipsum",
        text: (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit.
          </p>
        ),
        cover: demoImage,
        theme: {
          card: { background: "white" },
          title: { size: "2xl", color: "brand-base" },
        },
      }) as ComposableCardProps[]
    }
  />
);

export const DemoCertificationsCardSlider = () => (
  <CardGrid
    title="Descriptive statement lorem ipsum dolor sit amet"
    eyebrow="Certifications & awards"
    intro={
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit etiam eu{" "}
        <a href="">UN SDGs</a>, <a href="">D&I Certifications</a>,{" "}
        <a href="">Environmental Certifications</a>.
      </p>
    }
    theme={{
      module: { align: "center" },
      slider: {
        mobile: true,
        desktop: true,
      },
      grid: {
        gapHorizontal: "md",
        gapVertical: "md",
        columns: 4,
      },
    }}
    items={
      new Array(6).fill({
        type: "card.composable",
        title: "Title certification",
        image: demoImage4,
        buttons: [{ label: "button", href: "/" }],
        theme: {
          card: {
            align: "center",
            effect: "grayscale",
            background: "white",
            border: "neutral-85",
            spacing: "lg",
          },
          title: { size: "md", color: "action-base" },
          image: { height: "sm" },
          buttons: { hidden: true },
        },
      }) as ComposableCardProps[]
    }
  />
);

export const DemoPrimaLifegrid = () => (
  <CardGrid
    title="Life at Prima"
    eyebrow="#primalife"
    intro={
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit etiam eu</p>
    }
    theme={{
      slider: {
        mobile: true,
        desktop: false,
      },
      grid: {
        gapHorizontal: "lg",
        gapVertical: "lg",
        columns: 3,
        stagger: true,
      },
    }}
    items={
      new Array(3).fill({
        type: "card.image",
        image: demoImage,
        theme: {
          image: { ratio: "19/27" },
        },
      }) as ImageCardProps[]
    }
  />
);
