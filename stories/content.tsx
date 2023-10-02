import { AccordionProps } from "../components/accordion/Accordion";
import { ResourceCardProps } from "../components/cards/ResourceCard";
import { TestimonialType } from "../components/testimonials/Testimonials";
import { ImageType } from "../types";

export const demoImage: ImageType = {
  src: "/storybook/demoimage1-880x528.jpg",
  alt: "demoimage",
  width: 880,
  height: 528,
};

export const demoImage2: ImageType = {
  src: "/storybook/demoimage2-1296x893.jpg",
  alt: "demoimage2",
  width: 1296,
  height: 893,
};

export const demoImage3: ImageType = {
  src: "/storybook/demoimage3-800x1200.jpg",
  alt: "demoimage3",
  width: 800,
  height: 1200,
};

export const demoImage4: ImageType = {
  src: "/storybook/demoimage4-970x546.webp",
  alt: "demoimage4",
  width: 970,
  height: 546,
};

export const demoLogo1: ImageType = {
  src: "/storybook/amazon-2500x752.svg",
  alt: "demologo1",
  width: 2500,
  height: 752,
};

export const demoLogo2: ImageType = {
  src: "/storybook/google-2500x816.svg",
  alt: "demologo2",
  width: 2500,
  height: 816,
};

export const demoIcon1: ImageType = {
  src: "/storybook/demo-icon-30x30.svg",
  alt: "demoicon",
  width: 30,
  height: 30,
};

export const demoFAQList: AccordionProps["items"] = [
  {
    title: "What is the best thing about Switzerland?",
    content: [
      {
        _key: "1bc91c6df8b3",
        _type: "block",
        children: [
          {
            _key: "9dc1274a39d5",
            _type: "span",
            marks: [],
            text: "We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
  },
  {
    title:
      "Did you hear about the mathematician who's afraid of negative numbers?",
    content: (
      <>
        <p>He&apos;ll stop at nothing to avoid them!</p>
        <p>
          Ulysses, Ulysses — Soaring through all the galaxies. In search of
          Earth, flying in to the night. Ulysses, Ulysses — Fighting evil and
          tyranny, with all his power, and with all of his might. Ulysses —
          no-one else can do the things you do. Ulysses — like a bolt of thunder
          from the blue. Ulysses — always fighting all the evil forces bringing
          peace and justice to all.
        </p>
        <p>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80"
            alt=""
          />
        </p>
      </>
    ),
  },
  {
    title: "Hear about the new restaurant called Karma?",
    content: <p>There's no menu: You get what you deserve.</p>,
  },
  {
    title: "Did you hear about the actor who fell through the floorboards?",
    content: <p>He was just going through a stage.</p>,
  },
  {
    title: "Did you hear about the claustrophobic astronaut?",
    content: <p>He just needed a little space.</p>,
  },
];

export const demoTestimonialsList: TestimonialType[] = [
  {
    title: "Solid foundation for any project",
    content:
      "This is a very complex and beautiful set of elements. Under the hood it comes with the best things from 2 different worlds: Figma and Tailwind.",
    image: demoImage,
    name: "Bonnie Green",
    jobTitle: "CTO at Open AI",
  },
  {
    title: "Efficient Collaborating",
    content:
      "This is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application.",
    name: "Joseph McFall",
    image: demoImage,
    jobTitle: "",
  },
  {
    title: "Solid foundation for any project",
    content:
      "I recently got my hands on This Pro, and holy crap, I'm speechless with how easy this was to integrate within my application. Most templates are a pain, code is scattered, and near impossible to theme.",
    name: "Michael Gough",
    image: demoImage,
  },
  {
    title: "A must-have for designers",
    name: "Lana Byrd",
    image: demoImage,
    jobTitle: "Front-end engineer at Meta",
  },
  {
    content: (
      <>
        <p>
          This provides a robust set of design tokens and components based on
          the popular Tailwind CSS framework.
        </p>
        <p>
          From the most used UI components like forms and navigation bars to the
          whole app screens designed both for desktop and mobile, this UI kit
          provides a solid foundation for any project.
        </p>
      </>
    ),
    name: "Helene Engels",
    image: demoImage,
    jobTitle: "Software architect at Amazon",
  },
  {
    title: "Speechless with how easy this was to integrate",
    content: [
      {
        _key: "1bc91c6df8b3",
        _type: "block",
        children: [
          {
            _key: "9dc1274a39d5",
            _type: "span",
            marks: [],
            text: "We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    image: demoImage,
    jobTitle: "Creative Director at Apple",
  },
  {
    title: "Perfect choice for a SaaS application",
    content: (
      <p>
        I recently got my hands on This Pro, and holy crap, I'm speechless with
        how easy this was to integrate within my application. Most templates are
        a pain, code is scattered, and near impossible to theme.
      </p>
    ),
    image: demoImage,
    name: "Robert Brown",
    jobTitle: "Junior developer at SAP",
  },
];

export const demoResourceCards: ResourceCardProps[] = [
  {
    type: "page.blog",
    href: "/resources/blog/revolutionizing-business-efficiency-with-our-cutting-edge-saas-solution-2",
    intro: "blog article…",
    date: "2023-02-08",
    _id: "904fbe64-1f13-446f-93e5-d63d0c12a810",
    title:
      "Part 2 Revolutionizing Business Efficiency with our Cutting-Edge SaaS Solution",
    image: demoImage,
    authors: [
      {
        name: "Arjen Scherff-de Water",
        image: demoImage4,
      },
    ],
  },
  {
    type: "page.blog",
    _id: "dc8f969b-f1db-407c-b385-8eb75596759c",
    intro: "intro",
    date: "2023-02-08",
    title:
      "Streamline Your Operations with [Company Name]'s All-in-One SaaS Solution",
    href: "/resources/blog/streamline-your-operations-with-company-name-s-all-in-one-saas-solution",
    image: demoImage,
  },
  {
    type: "page.blog",
    _id: "cfd64e33-3f04-4eb7-b25b-000266d82e88",
    tags: ["Docs"],
    date: "2023-02-08",
    title:
      "Maximizing Productivity with [Company Name]'s SaaS Solution: A Comprehensive Guide",
    href: "/resources/blog/maximizing-productivity-with-company-name-s-saas-solution-a-comprehensive-guide",
  },
  {
    type: "page.blog",
    title:
      "The benefits of choosing company names saas solution over traditional software",
    tags: ["Marketing", "Sales", "API", "Docs"],
    image: demoImage2,
    authors: [
      {
        name: "Dan Malone",
        image: demoImage2,
      },
      {
        name: "Arjen Scherff-de Water",
        image: demoImage4,
      },
    ],
    date: "2023-02-07",
    _id: "52a89185-251e-4358-8811-803150925cff",
    href: "/resources/blog/the-benefits-of-choosing-company-name-s-saas-solution-over-traditional-software",

    intro:
      "Running a business is complex and time-consuming, but it doesn't have to be. With [Company Name]'s all-in-one SaaS solution, you can streamline your operations, save time and focus on what really matters – growing your business.\n\nOur platform provides a suite of tools and features that can help you manage all aspects of your business, from sales and marketing to finance and operations. With [Company Name], you'll be able to automate routine tasks, track your progress, and make data-driven decisions that can help you grow your business faster and more effectively.\n\nWhat's more, our solution is designed to be flexible and scalable, so it can grow with your business. Whether you're a small start-up or a large enterprise, [Company Name] has everything you need to succeed. And with our 24/7 customer support, you can be sure that you'll always have the help you need, when you need it.\n\nSo why waste time and resources on disparate systems and tools when you can have it all in one place with [Company Name]? Sign up for a free trial today and experience the difference for yourself!",
  },
  {
    type: "page.blog",
    tags: ["Marketing", "Sales"],
    title:
      "Revolutionizing Business Efficiency with our Cutting-Edge SaaS Solution",
    href: "/resources/blog/revolutionizing-business-efficiency-with-our-cutting-edge-saas-solution",
    intro:
      "In today's fast-paced business world, companies are always looking for ways to streamline their operations and increase efficiency. This is where [Company Name] comes in. Our cutting-edge SaaS solution is designed to help businesses of all sizes optimize their processes and achieve their goals faster and more effectively. From automating mundane tasks to providing real-time insights into performance, our solution is packed with features that will help you work smarter, not harder.\n\nOne of the key benefits of [Company Name]'s SaaS solution is its ability to integrate with a wide range of tools and systems. This means that you can easily connect your existing infrastructure to our platform, eliminating the need for manual data entry and reducing the risk of errors. With our solution, you can access all of your business data in one place, making it easier to track your progress and make informed decisions.\n\nAdditionally, [Company Name]'s SaaS solution is designed to be user-friendly and intuitive. We understand that not everyone is a tech expert, which is why we've made our platform accessible to everyone. Whether you're a small business owner or a busy professional, you'll find our solution easy to use and quick to implement. With [Company Name], you'll be able to focus on what really matters – growing your business and achieving your goals.\n\nSo if you're looking for a powerful and flexible SaaS solution that can help you revolutionize your business efficiency, look no further than [Company Name]. Sign up for a free trial today and experience the difference for yourself!",
    authors: [
      {
        name: "Dan Malone",
        image: demoImage,
      },
    ],
    date: "2023-02-06",
    _id: "68274f0a-8e6d-42c8-ace8-09a8b5498eae",
  },
  {
    type: "page.blog",
    _id: "77981899-1c64-4af0-9529-78c24c27d9e7",
    title:
      "The Future of Work: How [Company Name]'s SaaS Solution is Empowering Remote Teams",
    href: "/resources/blog/the-future-of-work-how-company-name-s-saas-solution-is-empowering-remote-teams",
    intro:
      "The COVID-19 pandemic has completely transformed the way we work. With remote work becoming the new norm, companies are facing new challenges when it comes to managing their teams and staying productive. That's where [Company Name]'s SaaS solution comes in. Our platform is specifically designed to support remote teams, providing a suite of tools and features that make it easy for your team to collaborate, communicate and get things done from anywhere in the world.\n\nWith [Company Name], you'll be able to keep your team connected and engaged, no matter where they are. Our platform provides real-time collaboration tools, like chat, video conferencing, and file sharing, making it easy for your team to work together on projects and stay up-to-date with each other's progress. Additionally, our platform offers robust project management tools that can help you keep your team on track and on schedule, even when they're working remotely.\n\nAt [Company Name], we're committed to helping businesses succeed in the new world of work. Our SaaS solution is designed to be flexible, scalable and easy to use, so you can focus on what really matters – growing your business and achieving your goals. So if you're looking for a powerful solution that can help you manage your remote team, look no further than [Company Name].",
    authors: [
      {
        name: "Dan Malone",
        image: demoImage,
      },
    ],
    tags: ["Marketing", "Sales", "API"],
    date: "2023-02-05",
  },
];

export const demoPortableTextArticle = [
  {
    style: "h1",
    _key: "ba680503c97a",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "Heading 1",
        _key: "e5e395f1c7b8",
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
        text: "Heading 2",
        _key: "992a243112eb",
      },
    ],
    _type: "block",
    style: "h2",
    _key: "bbff11df73cb",
  },
  {
    style: "h3",
    _key: "f1e5485fc3b0",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "Heading 3",
        _key: "9ce285c93cda",
      },
    ],
    _type: "block",
  },
  {
    markDefs: [],
    children: [
      {
        marks: [],
        text: "Heading 4",
        _key: "c4297acbdfea",
        _type: "span",
      },
    ],
    _type: "block",
    style: "h4",
    _key: "ea55a1cf8140",
  },
  {
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "Heading 5",
        _key: "a0c6c54654c9",
      },
    ],
    _type: "block",
    style: "h5",
    _key: "815aefe22c4e",
  },
  {
    _type: "block",
    style: "normal",
    _key: "b529e01c166a",
    markDefs: [
      {
        target: null,
        download: false,
        _type: "link",
        href: "https://www.example.com.",
        _key: "2dcbe4924286",
      },
      {
        color: {
          background: "white",
          text: "gray-950",
        },
        _type: "color",
        _key: "a7bb758f65b9",
      },
    ],
    children: [
      {
        _type: "span",
        marks: [],
        text: "This is a paragraph ",
        _key: "80b829bc75f3",
      },
      {
        marks: ["strong"],
        text: "bold",
        _key: "a5eeb67bab04",
        _type: "span",
      },
      {
        _key: "dbba6f75531e",
        _type: "span",
        marks: [],
        text: " ",
      },
      {
        text: "italic ",
        _key: "7306991eda85",
        _type: "span",
        marks: ["em"],
      },
      {
        _type: "span",
        marks: ["2dcbe4924286"],
        text: "link",
        _key: "d232995383a5",
      },
      {
        marks: [],
        text: " ",
        _key: "cbda993aa989",
        _type: "span",
      },
      {
        _type: "span",
        marks: ["a7bb758f65b9"],
        text: "colour",
        _key: "6e6fadd87fc4",
      },
    ],
  },
  {
    _type: "block",
    style: "normal",
    _key: "4c79c7d654af",
    listItem: "bullet",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "672107e0f58d",
      },
    ],
    level: 1,
  },
  {
    children: [
      {
        marks: [],
        text: "list item",
        _key: "304d9e97a916",
        _type: "span",
      },
    ],
    level: 1,
    _type: "block",
    style: "normal",
    _key: "f9f716a2bb4b",
    listItem: "bullet",
    markDefs: [],
  },
  {
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "4a28da76d6f3",
      },
    ],
    level: 2,
    _type: "block",
    style: "normal",
    _key: "635fcc6d0c24",
    listItem: "bullet",
    markDefs: [],
  },
  {
    _key: "f1ed031f5fce",
    listItem: "bullet",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "af9e8e1e67b7",
      },
    ],
    level: 3,
    _type: "block",
    style: "normal",
  },
  {
    listItem: "bullet",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "98734ff9a8f4",
      },
    ],
    level: 3,
    _type: "block",
    style: "normal",
    _key: "1c3eb1f0c5aa",
  },
  {
    level: 2,
    _type: "block",
    style: "normal",
    _key: "52b591f43ab0",
    listItem: "bullet",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "c3ffcff16a67",
      },
    ],
  },
  {
    _type: "block",
    style: "normal",
    _key: "7fbbc647f247",
    listItem: "bullet",
    markDefs: [],
    children: [
      {
        _key: "f297d9900344",
        _type: "span",
        marks: [],
        text: "list item",
      },
    ],
    level: 1,
  },
  {
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "1ed85c5995a1",
      },
    ],
    level: 1,
    _type: "block",
    style: "normal",
    _key: "5b13fc1817c9",
    listItem: "number",
    markDefs: [],
  },
  {
    _type: "block",
    style: "normal",
    _key: "6ca30a2f0c84",
    listItem: "number",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "0de679ffa142",
      },
    ],
    level: 1,
  },
  {
    _type: "block",
    style: "normal",
    _key: "e098898cd693",
    listItem: "number",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "0d08e3b62693",
      },
    ],
    level: 2,
  },
  {
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "d822b9b5125b",
      },
    ],
    level: 3,
    _type: "block",
    style: "normal",
    _key: "2a0f2142c31e",
    listItem: "number",
    markDefs: [],
  },
  {
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "9c2d6c955d63",
      },
    ],
    level: 3,
    _type: "block",
    style: "normal",
    _key: "5426ec4a449f",
    listItem: "number",
    markDefs: [],
  },
  {
    listItem: "number",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "dc47a40a6485",
      },
    ],
    level: 2,
    _type: "block",
    style: "normal",
    _key: "1c0cdd380aa9",
  },
  {
    level: 1,
    _type: "block",
    style: "normal",
    _key: "5b72a03abd07",
    listItem: "number",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "f43c6d3996ee",
      },
    ],
  },
  {
    _key: "429cab7a9878",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "",
        _key: "243cbeb4e4b3",
      },
    ],
    _type: "block",
    style: "normal",
  },
  {
    _key: "0478cdae46d4",
    listItem: "check",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "f6f9a1edf7f7",
      },
    ],
    level: 1,
    _type: "block",
    style: "normal",
  },
  {
    _type: "block",
    style: "normal",
    _key: "1e8327a2adf9",
    listItem: "check",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "c2fe7a5c6d62",
      },
    ],
    level: 1,
  },
  {
    _type: "block",
    style: "normal",
    _key: "ff5d1fd5efaa",
    listItem: "check",
    markDefs: [],
    children: [
      {
        text: "list item",
        _key: "af6465e38c3b",
        _type: "span",
        marks: [],
      },
    ],
    level: 2,
  },
  {
    level: 3,
    _type: "block",
    style: "normal",
    _key: "076ddd530ec6",
    listItem: "check",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "8ce666210cdd",
      },
    ],
  },
  {
    level: 3,
    _type: "block",
    style: "normal",
    _key: "d8ac03258512",
    listItem: "check",
    markDefs: [],
    children: [
      {
        _key: "b20730b2afc7",
        _type: "span",
        marks: [],
        text: "list item",
      },
    ],
  },
  {
    level: 2,
    _type: "block",
    style: "normal",
    _key: "bc54c2237b7f",
    listItem: "check",
    markDefs: [],
    children: [
      {
        _key: "3ffcfd2df9b8",
        _type: "span",
        marks: [],
        text: "list item",
      },
    ],
  },
  {
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "list item",
        _key: "9d1e24d10244",
      },
    ],
    level: 1,
    _type: "block",
    style: "normal",
    _key: "6701df37fc30",
    listItem: "check",
  },
  {
    style: "normal",
    _key: "510e30c98eca",
    markDefs: [],
    children: [
      {
        _key: "5efe9f768ab3",
        _type: "span",
        marks: [],
        text: "",
      },
    ],
    _type: "block",
  },
  {
    markDefs: null,
    source: {
      asset: {
        _ref: "image-c2ab5713c175d51577836521aed0dbd77e9803b1-64x64-png",
        _type: "reference",
      },
      _type: "image",
    },
    _key: "3f580cfb8bac",
    _type: "image.simple",
    caption: "image of a calendar",
    image: {
      crop: null,
      caption: null,
      src: "https://cdn.sanity.io/images/vs4fnw8m/development/c2ab5713c175d51577836521aed0dbd77e9803b1-64x64.png",
      width: 64,
      height: 64,
      alt: null,
      hotspot: null,
    },
  },
  {
    children: [
      {
        _type: "span",
        marks: [],
        text: "",
        _key: "c77a4cfa83c3",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "8faf8bed65f0",
    markDefs: [],
  },
  {
    loop: false,
    caption: "video of a bunny",
    _key: "cf7497a23bff",
    _type: "video",
    autoPlay: false,
    youtube: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    provider: "youtube",
    video: {
      loop: false,
      autoPlay: false,
      caption: "video of a bunny",
      provider: "youtube",
      frameless: null,
      videoId: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    },
    markDefs: null,
  },
  {
    style: "normal",
    _key: "b9913f393d61",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "horizontal buttons",
        _key: "999600e8c700",
      },
    ],
    _type: "block",
  },
  {
    _key: "7064ce9549aa",
    items: [
      {
        presetTheme: {
          name: "primary",
          icon: {
            name: "globe",
            position: "after",
          },
          mobile: {
            border: {
              color: "gray-100",
              width: "4",
              radius: "md",
            },
            background: {
              paddingX: "4",
              color: "gray-800",
              paddingY: "3",
            },
            _type: "buttonTheme",
            label: {
              size: "base",
              weight: "bold",
              font: "text",
              uppercase: true,
              color: "gray-100",
            },
          },
          tablet: {
            _type: "buttonTheme",
            label: {
              size: "lg",
            },
          },
          desktop: {
            label: {
              size: "xl",
            },
            background: {
              paddingY: "4",
              paddingX: "5",
            },
            _type: "buttonTheme",
          },
          hover: {
            background: "gray-200",
            label: "gray-950",
            border: "gray-300",
            underline: true,
          },
        },
        target: null,
        _key: "67c34c65109a",
        language: null,
        href: "https://www.example.com.",
        label: "Button 1",
        download: false,
        theme: null,
      },
      {
        label: "Button 1",
        download: false,
        theme: null,
        presetTheme: {
          hover: {
            background: "gray-200",
            label: "gray-950",
            border: "gray-300",
            underline: true,
          },
          name: "primary",
          icon: {
            name: "globe",
            position: "after",
          },
          mobile: {
            border: {
              color: "gray-100",
              width: "4",
              radius: "md",
            },
            background: {
              paddingX: "4",
              color: "gray-800",
              paddingY: "3",
            },
            _type: "buttonTheme",
            label: {
              font: "text",
              uppercase: true,
              color: "gray-100",
              size: "base",
              weight: "bold",
            },
          },
          tablet: {
            _type: "buttonTheme",
            label: {
              size: "lg",
            },
          },
          desktop: {
            label: {
              size: "xl",
            },
            background: {
              paddingY: "4",
              paddingX: "5",
            },
            _type: "buttonTheme",
          },
        },
        target: null,
        _key: "068f24a037df3578cb682ebc0c758e6b",
        language: null,
        href: "https://www.example.com.",
      },
    ],
    direction: "horizontal",
    markDefs: null,
    _type: "buttons",
  },
  {
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "vertical buttons",
        _key: "ea20b5014962",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "2fd4830407eb",
  },
  {
    _key: "5635c2c27957",
    items: [
      {
        href: "https://www.example.com.",
        label: "Button 1",
        download: false,
        theme: null,
        presetTheme: {
          icon: {
            name: "globe",
            position: "after",
          },
          mobile: {
            border: {
              color: "gray-100",
              width: "4",
              radius: "md",
            },
            background: {
              paddingX: "4",
              color: "gray-800",
              paddingY: "3",
            },
            _type: "buttonTheme",
            label: {
              size: "base",
              weight: "bold",
              font: "text",
              uppercase: true,
              color: "gray-100",
            },
          },
          tablet: {
            _type: "buttonTheme",
            label: {
              size: "lg",
            },
          },
          desktop: {
            label: {
              size: "xl",
            },
            background: {
              paddingY: "4",
              paddingX: "5",
            },
            _type: "buttonTheme",
          },
          hover: {
            background: "gray-200",
            label: "gray-950",
            border: "gray-300",
            underline: true,
          },
          name: "primary",
        },
        target: null,
        _key: "67c34c65109a",
        language: null,
      },
      {
        theme: null,
        presetTheme: {
          hover: {
            background: "gray-200",
            label: "gray-950",
            border: "gray-300",
            underline: true,
          },
          name: "primary",
          icon: {
            name: "globe",
            position: "after",
          },
          mobile: {
            border: {
              color: "gray-100",
              width: "4",
              radius: "md",
            },
            background: {
              paddingX: "4",
              color: "gray-800",
              paddingY: "3",
            },
            _type: "buttonTheme",
            label: {
              color: "gray-100",
              size: "base",
              weight: "bold",
              font: "text",
              uppercase: true,
            },
          },
          tablet: {
            _type: "buttonTheme",
            label: {
              size: "lg",
            },
          },
          desktop: {
            label: {
              size: "xl",
            },
            background: {
              paddingY: "4",
              paddingX: "5",
            },
            _type: "buttonTheme",
          },
        },
        target: null,
        _key: "068f24a037df3578cb682ebc0c758e6b",
        language: null,
        href: "https://www.example.com.",
        label: "Button 1",
        download: false,
      },
    ],
    direction: "vertical",
    _type: "buttons",
    markDefs: null,
  },
  {
    _key: "988e424915f7",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "",
        _key: "adc13e9ee6f2",
      },
    ],
    _type: "block",
    style: "normal",
  },
  {
    _type: "scriptRef",
    _key: "dca5b698b709",
    script: {
      _ref: "3875fe79-6513-4608-949d-064031842191",
      _type: "reference",
    },
    markDefs: null,
    title: " Twitter embed",
    items: [
      {
        src: "https://platform.twitter.com/widgets.js",
        _type: "item",
        html: '<blockquote class=\\"twitter-tweet\\"><p lang=\\"en\\" dir=\\"ltr\\">🔥 This “eyebrow” title treatment is not only great for clarifying your message, but it also makes a boring headline + body pattern look more interesting. <a href=\\"https://t.co/1DHFpuZCcC\\">pic.twitter.com/1DHFpuZCcC</a></p>&mdash; Steve Schoger (@steveschoger) <a href=\\"https://twitter.com/steveschoger/status/956229542288543744?ref_src=twsrc%5Etfw\\">January 24, 2018</a></blockquote>',
        _key: "570365c80563",
      },
    ],
  },
  {
    _type: "testimonials",
    _key: "cea4a7112203",
    items: [
      {
        image: {
          height: 542,
          alt: null,
          hotspot: null,
          crop: null,
          src: "https://cdn.sanity.io/images/vs4fnw8m/development/e81b568f43492f747e5fef048d7fef778f44f197-542x542.png",
          width: 542,
        },
        name: "Arjen",
        jobTitle: "Job title",
        title: "This is great",
        content: [
          {
            markDefs: [],
            children: [
              {
                _type: "span",
                marks: [],
                text: "This is a great testimonial!",
                _key: "79386a576e7d",
              },
            ],
            _type: "block",
            style: "normal",
            _key: "4f216e94e3b0",
          },
        ],
      },
      {
        title: "Hello!",
        content: [
          {
            _key: "c13b6e320f94",
            markDefs: [],
            children: [
              {
                marks: [],
                text: "This is content",
                _key: "6a69fbef1791",
                _type: "span",
              },
            ],
            _type: "block",
            style: "normal",
          },
        ],
        image: null,
        name: "myself",
        jobTitle: "job title",
      },
    ],
    markDefs: null,
  },
];
