import {
  TextSizeType,
  TEXT_SIZE_OPTIONS,
} from "../../components/text/text.options";
import {
  TitleSizeType,
  TITLE_SIZE_OPTIONS,
} from "../../components/title/title.options";
import { demoImage } from "../../stories/content";
import { COLORS } from "../../theme";
import {
  ColorType,
  HorizontalAlignType,
  HORIZONTAL_ALIGN_OPTIONS,
} from "../../types";
import { Block13, Block13Props } from "./Block13";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block13,
  title: "Blocks/13. Related Resources",
} as Meta;

const DEMO_CONTENT: Block13Props = {
  title: "title",
  intro: <p>intro</p>,
  items: [
    {
      intro: "intro",
      date: "2023-02-08",
      _id: "dc8f969b-f1db-407c-b385-8eb75596759c",
      title:
        "Streamline Your Operations with [Company Name]'s All-in-One SaaS Solution",
      href: "/resources/blog/streamline-your-operations-with-company-name-s-all-in-one-saas-solution",
      image: demoImage,
    },
    {
      date: "2023-02-08",
      _id: "cfd64e33-3f04-4eb7-b25b-000266d82e88",
      title:
        "Maximizing Productivity with [Company Name]'s SaaS Solution: A Comprehensive Guide",
      href: "/resources/blog/maximizing-productivity-with-company-name-s-saas-solution-a-comprehensive-guide",
    },
    {
      title:
        "The benefits of choosing company names saas solution over traditional software",
      href: "/resources/blog/the-benefits-of-choosing-company-name-s-saas-solution-over-traditional-software",

      intro:
        "Running a business is complex and time-consuming, but it doesn't have to be. With [Company Name]'s all-in-one SaaS solution, you can streamline your operations, save time and focus on what really matters – growing your business.\n\nOur platform provides a suite of tools and features that can help you manage all aspects of your business, from sales and marketing to finance and operations. With [Company Name], you'll be able to automate routine tasks, track your progress, and make data-driven decisions that can help you grow your business faster and more effectively.\n\nWhat's more, our solution is designed to be flexible and scalable, so it can grow with your business. Whether you're a small start-up or a large enterprise, [Company Name] has everything you need to succeed. And with our 24/7 customer support, you can be sure that you'll always have the help you need, when you need it.\n\nSo why waste time and resources on disparate systems and tools when you can have it all in one place with [Company Name]? Sign up for a free trial today and experience the difference for yourself!",
      date: "2023-02-07",
      _id: "52a89185-251e-4358-8811-803150925cff",
    },
    {
      date: "2023-02-06",
      _id: "68274f0a-8e6d-42c8-ace8-09a8b5498eae",
      title:
        "Revolutionizing Business Efficiency with our Cutting-Edge SaaS Solution",
      href: "/resources/blog/revolutionizing-business-efficiency-with-our-cutting-edge-saas-solution",

      intro:
        "In today's fast-paced business world, companies are always looking for ways to streamline their operations and increase efficiency. This is where [Company Name] comes in. Our cutting-edge SaaS solution is designed to help businesses of all sizes optimize their processes and achieve their goals faster and more effectively. From automating mundane tasks to providing real-time insights into performance, our solution is packed with features that will help you work smarter, not harder.\n\nOne of the key benefits of [Company Name]'s SaaS solution is its ability to integrate with a wide range of tools and systems. This means that you can easily connect your existing infrastructure to our platform, eliminating the need for manual data entry and reducing the risk of errors. With our solution, you can access all of your business data in one place, making it easier to track your progress and make informed decisions.\n\nAdditionally, [Company Name]'s SaaS solution is designed to be user-friendly and intuitive. We understand that not everyone is a tech expert, which is why we've made our platform accessible to everyone. Whether you're a small business owner or a busy professional, you'll find our solution easy to use and quick to implement. With [Company Name], you'll be able to focus on what really matters – growing your business and achieving your goals.\n\nSo if you're looking for a powerful and flexible SaaS solution that can help you revolutionize your business efficiency, look no further than [Company Name]. Sign up for a free trial today and experience the difference for yourself!",
    },
  ],
};

export const Default = () => <Block13 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block13
          {...DEMO_CONTENT}
          theme={{
            block: { background: color },
          }}
        />
      </div>
    ))}
  </>
);

export const Alignments = () => (
  <>
    {(Object.keys(HORIZONTAL_ALIGN_OPTIONS) as HorizontalAlignType[]).map(
      (align) => (
        <div key={align}>
          <Block13
            {...DEMO_CONTENT}
            theme={{
              block: { align },
            }}
          />
        </div>
      ),
    )}
  </>
);

export const TitleColors = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block13
          title={DEMO_CONTENT.title}
          theme={{
            title: { color },
          }}
        />
      </div>
    ))}
  </>
);

export const TitleSizes = () => (
  <>
    {(Object.keys(TITLE_SIZE_OPTIONS) as TitleSizeType[]).map((size) => (
      <div key={size}>
        <Block13
          title={DEMO_CONTENT.title}
          theme={{
            title: { size },
          }}
        />
      </div>
    ))}
  </>
);

export const IntroColors = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block13
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { color },
          }}
        />
      </div>
    ))}
  </>
);

export const IntroSizes = () => (
  <>
    {(Object.keys(TEXT_SIZE_OPTIONS) as TextSizeType[]).map((size) => (
      <div key={size}>
        <Block13
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { size },
          }}
        />
      </div>
    ))}
  </>
);
