import { TestimonialType } from "../components/testimonials/Testimonials";
import { ImageType } from "../types";

export const demoImage: ImageType = {
  src: "https://cdn.sanity.io/images/lra7ykt5/development/8176ab31464cc5bc14927e66e0f52433da2a51ea-880x528.jpg",
  alt: "demoimage",
  width: 880,
  height: 528,
};

export const demoImage2: ImageType = {
  src: "https://cdn.sanity.io/images/lra7ykt5/development/22a209cca6c9eccce6c2619d2f6ecee93c419336-1296x893.jpg",
  alt: "demoimage2",
  width: 1296,
  height: 893,
};

export const demoImage3: ImageType = {
  src: "https://cdn.sanity.io/images/lra7ykt5/development/7eaa67f5bb42ecf6d53e5949f32f898e1c4f16ae-800x1200.webp",
  alt: "demoimage3",
  width: 800,
  height: 1200,
};

export const demoImage4: ImageType = {
  src: "https://cdn.sanity.io/images/lra7ykt5/development/f008ee1237df81834de2329e6e74d9e693962a85-970x546.webp",
  alt: "demoimage4",
  width: 970,
  height: 546,
};

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
