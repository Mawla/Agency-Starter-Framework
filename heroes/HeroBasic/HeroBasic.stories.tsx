import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { demoImage, demoImage2, demoImage8 } from "../../stories/content";
import { ColorType } from "../../types";
import { HeroBasic } from "./HeroBasic";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: HeroBasic,
  title: "Hero/HeroBasic",
} as Meta;

// export const Default = () => (
//   <HeroBasic
//     title="Hello Prima"
//     text={
//       <p>
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Lorem Ipsum has been the industry's standard dummy text ever
//         since the 1500s, when an unknown printer took a galley of type and
//         scrambled it to make a type specimen book.
//       </p>
//     }
//     buttons={[
//       {
//         label: "get some inspiration",
//       },
//     ]}
//   />
// );

// export const BreakoutImage = () => (
//   <HeroBasic
//     title="Hello Prima"
//     text={
//       <p>
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Lorem Ipsum has been the industry's standard dummy text ever
//         since the 1500s, when an unknown printer took a galley of type and
//         scrambled it to make a type specimen book.
//       </p>
//     }
//     buttons={[
//       {
//         label: "get some inspiration",
//       },
//     ]}
//     visual={{
//       colors: {
//         color1: "action-dark",
//         color2: "action-base",
//         color3: "action-light",
//         color4: "action-base",
//       },
//       image1: demoImage8,
//     }}
//     breakOutImage
//     showLozenges
//   />
// );

// export const VisualGradientAction = () => (
//   <HeroBasic
//     title="Hello Prima"
//     text={<p>The second and fourth items should have a gradient</p>}
//     visual={{
//       colors: {
//         color1: "action-dark",
//         color2: "action-base",
//         color3: "action-light",
//         color4: "action-base",
//       },
//     }}
//   />
// );

// export const VisualGradientNeutral = () => (
//   <HeroBasic
//     title="Hello Prima"
//     text={<p>The second and fourth items should have a gradient</p>}
//     visual={{
//       colors: {
//         color1: "neutral-25",
//         color2: "neutral-base",
//         color3: "neutral-95",
//         color4: "neutral-base",
//       },
//     }}
//   />
// );

// export const VisualGradientBrand = () => (
//   <HeroBasic
//     title="Hello Prima"
//     text={<p>The second and fourth items should have a gradient</p>}
//     visual={{
//       colors: {
//         color1: "brand-dark",
//         color2: "brand-base",
//         color3: "brand-light",
//         color4: "brand-base",
//       },
//     }}
//   />
// );

// export const VisualImage1 = () => (
//   <HeroBasic
//     title="Hello Prima"
//     text={<p>With an image</p>}
//     visual={{
//       image1: demoImage,
//       colors: {
//         color1: "brand-dark",
//         color2: "brand-base",
//         color3: "brand-light",
//         color4: "brand-base",
//       },
//     }}
//   />
// );

// export const VisualImage2 = () => (
//   <HeroBasic
//     title="Hello Prima"
//     text={<p>With an image</p>}
//     visual={{
//       image2: demoImage,
//       colors: {
//         color1: "brand-dark",
//         color2: "brand-base",
//         color3: "brand-light",
//         color4: "brand-base",
//       },
//     }}
//   />
// );

// export const VisualImage1And2 = () => (
//   <HeroBasic
//     title="Hello Prima"
//     text={<p>With two images</p>}
//     visual={{
//       image1: demoImage,
//       image2: demoImage2,
//       colors: {
//         color1: "brand-dark",
//         color2: "brand-base",
//         color3: "brand-light",
//         color4: "brand-base",
//       },
//     }}
//   />
// );

// export const Colors = () => (
//   <>
//     {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[])
//       .reverse()
//       .map((color1: ColorType) =>
//         (Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
//           (color2: ColorType) => (
//             <div key={color1 + color2} className="mb-10">
//               <HeroBasic
//                 title="Hello prima."
//                 visual={{
//                   colors: {
//                     color1: color1,
//                     color2: color2,
//                     color3: color1,
//                     color4: color2,
//                   },
//                 }}
//                 buttons={[
//                   {
//                     label: "get some inspiration",
//                   },
//                 ]}
//               />
//             </div>
//           )
//         )
//       )}
//   </>
// );

// export const NoContent = () => <HeroBasic />;

// export const WithLozenges = () => (
//   <HeroBasic
//     showLozenges
//     title="Prima"
//     eyebrow="Hello"
//     text={<p>With lozenges</p>}
//     visual={{
//       colors: {
//         color1: "brand-dark",
//         color2: "brand-base",
//         color3: "brand-light",
//         color4: "brand-base",
//       },
//     }}
//   />
// );

// export const PullUp = () => (
//   <div className="flex flex-col gap-10">
//     <div className="border">
//       <HeroBasic
//         showLozenges
//         title="Pull up next module"
//         eyebrow="Hello"
//         text={<p>With lozenges</p>}
//         visual={{
//           colors: {
//             color1: "brand-dark",
//             color2: "brand-base",
//             color3: "brand-light",
//             color4: "brand-base",
//           },
//         }}
//         pullUp
//       />
//       <div className="h-32 z-20 relative bg-neutral-base/75 rounded-3xl" />
//     </div>

//     <div className="border">
//       <HeroBasic
//         showLozenges
//         title="Don't pull up next module"
//         eyebrow="Hello"
//         text={<p>With lozenges</p>}
//         visual={{
//           colors: {
//             color1: "brand-dark",
//             color2: "brand-base",
//             color3: "brand-light",
//             color4: "brand-base",
//           },
//         }}
//         pullUp={false}
//       />
//       <div className="h-32 z-20 relative bg-neutral-base/75 rounded-3xl" />
//     </div>

//     <div className="border">
//       <HeroBasic
//         showLozenges={false}
//         title="Pull up next module"
//         eyebrow="Hello"
//         text={<p>Without lozenges</p>}
//         visual={{
//           colors: {
//             color1: "brand-dark",
//             color2: "brand-base",
//             color3: "brand-light",
//             color4: "brand-base",
//           },
//         }}
//         pullUp
//       />
//       <div className="h-32 z-20 relative bg-neutral-base/75 rounded-3xl" />
//     </div>

//     <div className="border">
//       <HeroBasic
//         showLozenges={false}
//         title="Don't pull up next module"
//         eyebrow="Hello"
//         text={<p>Without lozenges</p>}
//         visual={{
//           colors: {
//             color1: "brand-dark",
//             color2: "brand-base",
//             color3: "brand-light",
//             color4: "brand-base",
//           },
//         }}
//         pullUp={false}
//       />
//       <div className="h-32 z-20 relative bg-neutral-base/75 rounded-3xl" />
//     </div>
//   </div>
// );
