import { demoImage } from "../../stories/content";
import Button from "../buttons/Button";
import Link from "../buttons/Link";
import ResponsiveImage from "../images/ResponsiveImage";
import PortableTextComponent from "../portabletext/PortableText";
import Fancybox from "./Fancybox";
import { Meta } from "@storybook/react";
import React from "react";

const DEMO_CONTENT = [
  {
    direction: "vertical",
    markDefs: null,
    _type: "buttons",
    _key: "e11895e21e79",
    items: [
      {
        download: false,
        theme: null,

        target: "lightbox",
        _key: "8071703ceca5",
        language: null,
        href: "http://example.com",
        label: "iframe dialog",
      },
      {
        href: "https://www.africau.edu/images/default/sample.pdf",
        label: "pdf file",
        download: false,
        theme: null,

        target: "lightbox",
        _key: "6d54ea5e85dd",
        language: null,
      },
      {
        label: "internal link",
        download: false,
        theme: null,

        target: "lightbox",
        _key: "a6696f7849ae",
        language: null,
        href: "/sign-up",
      },
      {
        label: "image",
        download: false,
        theme: null,

        target: "lightbox",
        _key: "53f9fca8dc96",
        language: null,
        href: "https://cdn.sanity.io/files/vs4fnw8m/development/877061a35eb552145c0c30580bfd34bba1e6c63d.png",
      },
      {
        download: null,
        theme: null,

        target: "lightbox",
        _key: "5b42f836f965",
        language: null,
        href: "https://www.youtube.com/embed/aqz-KE-bpKQ",
        label: "video link",
      },
      {
        target: "_blank",
        _key: "86db2c419cad380c02e23222814ba3b0",
        language: null,
        href: "https://google.com",
        label: "external link",
        download: false,
        theme: null,
      },
    ],
  },
  {
    children: [
      {
        marks: ["e9322f48f848"],
        text: "iframe dialog",
        _key: "079a9117a1b3",
        _type: "span",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "bd29ddebb876",
    markDefs: [
      {
        href: "http://example.com",
        _key: "e9322f48f848",
        target: "lightbox",
        download: false,
        _type: "link",
      },
    ],
  },
  {
    style: "normal",
    _key: "05d35a9d8c0c",
    markDefs: [
      {
        target: "lightbox",
        download: false,
        _type: "link",
        href: "https://www.africau.edu/images/default/sample.pdf",
        _key: "d8bebf34e137",
      },
    ],
    children: [
      {
        _type: "span",
        marks: ["d8bebf34e137"],
        text: "pdf file",
        _key: "17a50803ef4b",
      },
    ],
    _type: "block",
  },
  {
    _key: "bde34e04f920",
    markDefs: [
      {
        internal: {
          _ref: "00ed66a5-cc33-4209-86ff-16e4a17f7280",
          _type: "reference",
        },
        _type: "link",
        href: "/sign-up",
        _key: "4b7e08e40938",
        target: "lightbox",
        download: false,
      },
    ],
    children: [
      {
        _type: "span",
        marks: ["4b7e08e40938"],
        text: "internal link",
        _key: "717df48a80f6",
      },
    ],
    _type: "block",
    style: "normal",
  },
  {
    markDefs: [
      {
        download: false,
        href: "https://cdn.sanity.io/files/vs4fnw8m/development/4533cf7708814c840d958c7934edba07dc9c7692.png",
        file: {
          _type: "file",
          asset: {
            _ref: "file-4533cf7708814c840d958c7934edba07dc9c7692-png",
            _type: "reference",
          },
        },
        _type: "link",
        _key: "69002b29cc92",
        target: "lightbox",
      },
    ],
    children: [
      {
        _type: "span",
        marks: ["69002b29cc92"],
        text: "image",
        _key: "e8c1b5e47d11",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "3f09e455eb13",
  },
  {
    _key: "e81d7b4791f5",
    markDefs: [
      {
        target: "lightbox",
        _type: "link",
        href: "https://www.google.com/maps/@51.5039653,-0.1246493,14.12z",
        _key: "fc1b7b32d9e4",
      },
    ],
    children: [
      {
        marks: ["fc1b7b32d9e4"],
        text: "google maps",
        _key: "4d92fda2c3aa",
        _type: "span",
      },
    ],
    _type: "block",
    style: "normal",
  },
  {
    _key: "be1bbcecdecb",
    markDefs: [
      {
        target: "lightbox",
        _type: "link",
        href: "https://www.youtube.com/embed/aqz-KE-bpKQ",
        _key: "5542ffdf8ce5",
      },
    ],
    children: [
      {
        _key: "ab0028a32739",
        _type: "span",
        marks: ["5542ffdf8ce5"],
        text: "video link",
      },
    ],
    _type: "block",
    style: "normal",
  },
  {
    markDefs: [
      {
        target: "_blank",
        _type: "link",
        href: "https://google.com",
        _key: "9a573b56fd2b",
      },
    ],
    children: [
      {
        _type: "span",
        marks: ["9a573b56fd2b"],
        text: "new window",
        _key: "151d0e2550a1",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "98bec1fd9bec",
  },
  {
    image: demoImage,
    markDefs: null,
    _type: "image.simple",
    source: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-22a209cca6c9eccce6c2619d2f6ecee93c419336-1296x893-jpg",
      },
    },
    _key: "1683b74dc285",
  },
];

export default {
  component: Fancybox,
  title: "components/Fancybox",
} as Meta;

export const Default = () => (
  <div>
    <Button href="/foo" target="lightbox">
      Open lightbox button
    </Button>

    <Link href="/foo" target="lightbox">
      Open lightbox link
    </Link>
  </div>
);

export const PortableText = () => (
  <PortableTextComponent content={DEMO_CONTENT} />
);

export const Image = () => (
  <div>
    <ResponsiveImage {...demoImage} zoom />
  </div>
);
