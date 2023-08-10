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
  alt: "demoimage4",
  width: 2500,
  height: 752,
};

export const demoLogo2: ImageType = {
  src: "/storybook/google-2500x816.svg",
  alt: "demoimage4",
  width: 2500,
  height: 816,
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
