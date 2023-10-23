import { demoImage, demoImage2, demoImage3 } from "../../stories/content";
import { COLORS } from "../../theme";
import { ColorType } from "../../types";
import { Block14, Block14Props } from "./Block14";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block14,
  title: "Blocks/14. Article",
} as Meta;

const DEMO_CONTENT = {
  body: [
    {
      _key: "c12b08903627",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project.",
          _key: "7e03fc2a6e910",
        },
      ],
      _type: "block",
      style: "normal",
    },
    {
      children: [
        {
          marks: [],
          text: "But then I found a ",
          _key: "80c58f719e5a0",
          _type: "span",
        },
        {
          marks: ["562e48a84a17"],
          text: "component library based on Tailwind CSS called Flowbite",
          _key: "80c58f719e5a1",
          _type: "span",
        },
        {
          _type: "span",
          marks: [],
          text: ". It comes with the most commonly used UI components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.",
          _key: "80c58f719e5a2",
        },
      ],
      _type: "block",
      style: "normal",
      _key: "acd89914b164",
    },
    {
      style: "h2",
      _key: "1a128bca6099",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Getting started with Flowbite",
          _key: "e5fc938169880",
        },
      ],
      _type: "block",
    },
    {
      _type: "image.simple",
      image: demoImage,
      markDefs: null,
      alt: "alt",
      caption: "captiojn",
      source: {
        _type: "image",
        asset: {
          _ref: "image-8176ab31464cc5bc14927e66e0f52433da2a51ea-880x528-jpg",
          _type: "reference",
        },
      },
      _key: "090a48fcdb37",
    },
    {
      caption: "caption",
      autoPlay: false,
      video: {
        provider: "youtube",
        frameless: null,
        videoId: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
        loop: false,
        autoPlay: false,
        caption: "caption",
      },
      markDefs: null,
      _key: "0d2c23689009",
      youtube: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      provider: "youtube",
      loop: false,
      _type: "video",
    },
    {
      markDefs: [],
      children: [
        {
          text: "It also includes a JavaScript file that enables interactive components, such as modals, dropdowns, and datepickers which you can optionally include into your project via CDN or NPM.",
          _key: "4a5f1fb1722b0",
          _type: "span",
          marks: [],
        },
      ],
      _type: "block",
      style: "normal",
      _key: "b0f774d02c3f",
    },
    {
      items: [
        {
          target: null,
          href: "https://www.example.com.",
          iconPosition: "after",
          download: false,
          icon: null,
          theme: {
            text: {
              color: "gray-50",
            },
            border: {
              color: "gray-800",
            },
            background: {
              color: "gray-500",
            },
          },
          _key: "c7b739b9ba64",
          language: null,
          label: "Button 1",
        },
        {
          label: "Button 2",
          icon: null,
          download: false,
          theme: {
            border: {
              color: "gray-800",
            },
            background: {
              color: "gray-500",
            },
            text: {
              color: "gray-50",
            },
          },
          _key: "a7608e951b0bbfbe89152ff3a3d5ed4d",
          language: null,
          href: "https://www.example.com.",
          iconPosition: "after",
          target: null,
        },
      ],
      markDefs: null,
      direction: "vertical",
      _type: "buttons",
      _key: "d55a31700fe1",
    },
    {
      style: "normal",
      _key: "15d4a7c796b5",
      markDefs: [
        {
          _type: "link",
          href: "https://flowbite.com/docs/getting-started/quickstart/",
          _key: "d61a71487b53",
          target: null,
        },
      ],
      children: [
        {
          _type: "span",
          marks: [],
          text: "You can check out the ",
          _key: "7b62680955f90",
        },
        {
          _key: "7b62680955f91",
          _type: "span",
          marks: ["d61a71487b53"],
          text: "quickstart guide",
        },
        {
          _type: "span",
          marks: [],
          text: " to explore the elements by including the CDN files into your project. But if you want to build a project with Flowbite I recommend you to follow the build tools steps so that you can purge and minify the generated CSS.",
          _key: "7b62680955f92",
        },
      ],
      _type: "block",
    },
    {
      markDefs: null,
      file: "https://cdn.sanity.io/files/vs4fnw8m/development/faa4eb4e76b264245012d81856fc34f9c71e1557.csv",
      _type: "csv",
      _key: "e21e3aadd1f0",
      fileName: "sample.csv",
    },
    {
      _type: "block",
      style: "normal",
      _key: "cc95df87bbde",
      markDefs: [
        {
          _key: "5294b243abf9",
          _type: "link",
          href: "https://flowbite.com/docs/components/tables/",
          target: null,
        },
      ],
      children: [
        {
          _type: "span",
          marks: [],
          text: "You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help you get started with your projects even faster. You can check out this ",
          _key: "68c5303ca0480",
        },
        {
          text: "comparison table",
          _key: "68c5303ca0481",
          _type: "span",
          marks: ["5294b243abf9"],
        },
        {
          text: " to better understand the differences between the open-source and pro version of Flowbite.",
          _key: "68c5303ca0482",
          _type: "span",
          marks: [],
        },
      ],
    },
    {
      style: "normal",
      _key: "4354939f1162",
      markDefs: [],
      children: [
        {
          _key: "69fe6be9262e",
          _type: "span",
          marks: [],
          text: "When does design come in handy?",
        },
      ],
      _type: "block",
    },
    {
      _type: "block",
      style: "normal",
      _key: "4d5f9ce71787",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "While it might seem like extra work at a first glance, here are some key moments in which prototyping will come in handy:",
          _key: "f5b818a791f40",
        },
      ],
    },
    {
      children: [
        {
          _type: "span",
          marks: ["strong"],
          text: "Usability testing",
          _key: "abfdca43b0460",
        },
        {
          marks: [],
          text: ". Does your user know how to exit out of screens? Can they follow your intended user journey and buy something from the site you’ve designed? By running a usability test, you’ll be able to see how users will interact with your design once it’s live;",
          _key: "abfdca43b0461",
          _type: "span",
        },
      ],
      level: 1,
      _type: "block",
      style: "normal",
      _key: "d6825292d998",
      listItem: "number",
      markDefs: [],
    },
    {
      listItem: "number",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: ["strong"],
          text: "Involving stakeholders",
          _key: "bf3be3a78b8d0",
        },
        {
          _key: "bf3be3a78b8d1",
          _type: "span",
          marks: [],
          text: ". Need to check if your GDPR consent boxes are displaying properly? Pass your prototype to your data protection team and they can test it for real;",
        },
      ],
      level: 1,
      _type: "block",
      style: "normal",
      _key: "dc2c81d78a23",
    },
    {
      style: "normal",
      _key: "061508b436b4",
      listItem: "number",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: ["strong"],
          text: "Impressing a client",
          _key: "e2fd5b9b91640",
        },
        {
          _type: "span",
          marks: [],
          text: ". Prototypes can help explain or even sell your idea by providing your client with a hands-on experience;",
          _key: "e2fd5b9b91641",
        },
      ],
      level: 1,
      _type: "block",
    },
    {
      listItem: "number",
      markDefs: [],
      children: [
        {
          _key: "ee85dade63960",
          _type: "span",
          marks: ["strong"],
          text: "Communicating your vision",
        },
        {
          text: ". By using an interactive medium to preview and test design elements, designers and developers can understand each other — and the project — better.",
          _key: "ee85dade63961",
          _type: "span",
          marks: [],
        },
      ],
      level: 1,
      _type: "block",
      style: "normal",
      _key: "be73d8aee98e",
    },
    {
      _type: "block",
      style: "h3",
      _key: "0a43d2375393",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Laying the groundwork for best design",
          _key: "d98e8e2b31ba0",
        },
      ],
    },
    {
      _key: "dd941e216b89",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project.",
          _key: "c7a41bf4bb2f0",
        },
      ],
      _type: "block",
      style: "normal",
    },
    {
      style: "normal",
      _key: "b47e8656d660",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Let's start by including the CSS file inside the head tag of your HTML.",
          _key: "57e237d97ec40",
        },
      ],
      _type: "block",
    },
    {
      _key: "44a7b156560f",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Understanding typography",
          _key: "920c631eaa650",
        },
      ],
      _type: "block",
      style: "h3",
    },
    {
      _type: "block",
      style: "h4",
      _key: "ae73d3804caf",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Type properties",
          _key: "1d96d4a370da0",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      _key: "f3b7b6a9ca7f",
      markDefs: [],
      children: [
        {
          marks: [],
          text: "A typeface is a collection of letters. While each letter is unique, certain shapes are shared across letters. A typeface represents shared patterns across a collection of letters.",
          _key: "4e0cc000bbfc0",
          _type: "span",
        },
      ],
    },
    {
      _type: "block",
      style: "h4",
      _key: "257ed9cc8ff4",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Baseline",
          _key: "8475ea6fae9c0",
        },
      ],
    },
    {
      children: [
        {
          _key: "dddd162e732d0",
          _type: "span",
          marks: [],
          text: "A typeface is a collection of letters. While each letter is unique, certain shapes are shared across letters. A typeface represents shared patterns across a collection of letters.",
        },
      ],
      _type: "block",
      style: "normal",
      _key: "9eb20465cbe3",
      markDefs: [],
    },
    {
      _key: "dca0c32ccf66",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Measurement from the baseline",
          _key: "d87e76a37a620",
        },
      ],
      _type: "block",
      style: "h4",
    },
    {
      _key: "08bb84d72bc1",
      markDefs: [],
      children: [
        {
          text: "A typeface is a collection of letters. While each letter is unique, certain shapes are shared across letters. A typeface represents shared patterns across a collection of letters.",
          _key: "93659ccedc500",
          _type: "span",
          marks: [],
        },
      ],
      _type: "block",
      style: "normal",
    },
    {
      style: "h3",
      _key: "ecfd09726eae",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Type classification",
          _key: "97437a844a380",
        },
      ],
      _type: "block",
    },
    {
      _key: "0fcb6af3b654",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Serif",
          _key: "575d5a494c5a0",
        },
      ],
      _type: "block",
      style: "h4",
    },
    {
      style: "normal",
      _key: "3243a9cfc072",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter. Typefaces with serifs are called serif typefaces. Serif fonts are classified as one of the following:",
          _key: "fca9a58d10f40",
        },
      ],
      _type: "block",
    },
    {
      style: "h4",
      _key: "831873e4e787",
      markDefs: [],
      children: [
        {
          marks: [],
          text: "Old-Style serifs",
          _key: "60f1516950630",
          _type: "span",
        },
      ],
      _type: "block",
    },
    {
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Low contrast between thick and thin strokes",
          _key: "cd90da6280440",
        },
      ],
      level: 1,
      _type: "block",
      style: "normal",
      _key: "1d1d60f7b269",
      listItem: "check",
    },
    {
      level: 1,
      _type: "block",
      style: "normal",
      _key: "1614cebb5a78",
      listItem: "check",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Diagonal stress in the strokes",
          _key: "8b7634fec2c30",
        },
      ],
    },
    {
      style: "normal",
      _key: "b1867e90f8c0",
      listItem: "check",
      markDefs: [],
      children: [
        {
          marks: [],
          text: "Slanted serifs on lower-case ascenders",
          _key: "6ae96af35f400",
          _type: "span",
        },
      ],
      level: 1,
      _type: "block",
    },
    {
      _type: "block",
      style: "h3",
      _key: "551afb56b684",
      markDefs: [],
      children: [
        {
          _key: "d9f56aa4f2640",
          _type: "span",
          marks: [],
          text: "Best practices for setting up your prototype",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      _key: "ec1abf21df3b",
      markDefs: [],
      children: [
        {
          _key: "2a49897526670",
          _type: "span",
          marks: ["strong"],
          text: "Low fidelity or high fidelity?",
        },
        {
          _key: "2a49897526671",
          _type: "span",
          marks: [],
          text: " Fidelity refers to how close a prototype will be to the real deal. If you’re simply preparing a quick visual aid for a presentation, a low-fidelity prototype — like a wireframe with placeholder images and some basic text — would be more than enough. But if you’re going for more intricate usability testing, a high-fidelity prototype — with on-brand colors, fonts and imagery — could help get more pointed results.",
        },
      ],
    },
    {
      _key: "d197503ebd63",
      markDefs: [],
      children: [
        {
          text: "Consider your user",
          _key: "bd84721d538a0",
          _type: "span",
          marks: ["strong"],
        },
        {
          _type: "span",
          marks: [],
          text: ". To create an intuitive user flow, try to think as your user would when interacting with your product. While you can fine-tune this during beta testing, considering your user’s needs and habits early on will save you time by setting you on the right path.",
          _key: "bd84721d538a1",
        },
      ],
      _type: "block",
      style: "normal",
    },
    {
      children: [
        {
          _type: "span",
          marks: ["strong"],
          text: "Start from the inside out",
          _key: "b645733f681e0",
        },
        {
          text: ". A nice way to both organize your tasks and create more user-friendly prototypes is by building your prototypes ‘inside out’. Start by focusing on what will be important to your user, like a Buy now button or an image gallery, and list each element by order of priority. This way, you’ll be able to create a prototype that puts your users’ needs at the heart of your design.",
          _key: "b645733f681e1",
          _type: "span",
          marks: [],
        },
      ],
      _type: "block",
      style: "normal",
      _key: "eb41cd34d8ee",
      markDefs: [],
    },
    {
      _type: "block",
      style: "normal",
      _key: "68b0c247b676",
      markDefs: [],
      children: [
        {
          _key: "0bb0e4a470fa0",
          _type: "span",
          marks: [],
          text: "And there you have it! Everything you need to design and share prototypes — right in Flowbite Figma.",
        },
      ],
    },
    {
      _key: "9548da15702e",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "\n",
          _key: "846bedc0aed0",
        },
      ],
      _type: "block",
      style: "normal",
    },
  ],
  relatedArticles: [
    {
      href: "/resources/blog/maximizing-productivity-with-company-name-s-saas-solution-a-comprehensive-guide",
      image: demoImage2,

      title:
        "Maximizing Productivity with [Company Name]'s SaaS Solution: A Comprehensive Guide",
    },
    {
      title:
        "The benefits of choosing company names saas solution over traditional software",
      href: "/resources/blog/the-benefits-of-choosing-company-name-s-saas-solution-over-traditional-software",
    },
    {
      title:
        "The Future of Work: How [Company Name]'s SaaS Solution is Empowering Remote Teams",
      href: "/resources/blog/the-future-of-work-how-company-name-s-saas-solution-is-empowering-remote-teams",
    },
  ],
  title:
    "Part 2 Revolutionizing Business Efficiency with our Cutting-Edge SaaS Solution",
  tags: [
    {
      title: "Docs",
      href: "/categories/docs",
    },
    {
      title: "API",
      href: "/solutions/api",
    },
  ],
  authors: [
    {
      name: "Dan Malone",
      image: demoImage3,
    },
    {
      name: "Arjen Scherff-de Water",
      image: demoImage2,
    },
  ],
  _key: "Og9e6vYeUmiIxp2_g76BQ",
  _type: "block.block14",
  date: "2023-02-08",
} as Block14Props;

export const Default = () => <Block14 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block14
          {...DEMO_CONTENT}
          theme={{
            block: { background: color },
          }}
        />
      </div>
    ))}
  </>
);
