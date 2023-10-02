import { getExportQuery } from "./export.query";
import "@testing-library/jest-dom";
import { parse, evaluate } from "groq-js";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

let dataset = [
  {
    _id: "testid",
    _type: "page.content",
    seo: {
      description: "seo description",
      excludeFromSitemap: false,
      title: "seo title",
    },
    slug: {
      _type: "slug",
      current: "search-test-title",
    },
    title: "search test title",
    blocks: [
      {
        _key: "nOMFI28RuKHj1sAsDhIQJ",
        _type: "block.block14",
        body: [
          {
            _key: "9f83a1329d17",
            _type: "block",
            children: [
              {
                _key: "2e1daa689a34",
                _type: "span",
                marks: [],
                text: "block article",
              },
            ],
            markDefs: [],
            style: "h1",
          },
        ],
      },
      {
        _key: "TfqT-378qPIusxJz2YILD",
        _type: "block.block18",
        footer: [
          {
            _key: "5330f9cc084b",
            _type: "block",
            children: [
              {
                _key: "170a37ba44ff",
                _type: "span",
                marks: [],
                text: "card grid footer",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        intro: [
          {
            _key: "01be8cc9df47",
            _type: "block",
            children: [
              {
                _key: "b7fdd91c428b",
                _type: "span",
                marks: [],
                text: "card grid intro",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        items: [
          {
            _key: "d4c361562763",
            _type: "card.composable",
            content: [
              {
                _key: "68af16dff0f6",
                _type: "block",
                children: [
                  {
                    _key: "a5e455e87128",
                    _type: "span",
                    marks: [],
                    text: "composable card content",
                  },
                ],
                markDefs: [],
                style: "normal",
              },
            ],
            subtitle: "composable card subtitle",
            title: "composable card title",
          },
          {
            _key: "546c840551f8",
            _type: "card.testimonial",
            testimonial: {
              content: [
                {
                  _key: "afb28e4b3e00",
                  _type: "block",
                  children: [
                    {
                      _key: "bb5a93a8cd880",
                      _type: "span",
                      marks: [],
                      text: "testimonial card single use content",
                    },
                  ],
                  markDefs: [],
                  style: "normal",
                },
              ],
              name: "person 1",
              title: "testimonial card single use title",
            },
          },
          {
            _key: "bea46e2288db",
            _type: "card.testimonial",
            testimonialRef: {
              _ref: "15def0ee-3af8-4022-b48e-46ea6a2cdde1",
              _type: "reference",
            },
          },
        ],
        title: "card grid title",
      },
      {
        _key: "t1kN7rFUYoinsCSQpOyL6",
        _type: "block.block4",
        body: [
          {
            _key: "ea792ec4bff3",
            _type: "block",
            children: [
              {
                _key: "84d88a4b36d80",
                _type: "span",
                marks: [],
                text: "default content body",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        intro: [
          {
            _key: "f9ab9427a28a",
            _type: "block",
            children: [
              {
                _key: "d6617ece643e0",
                _type: "span",
                marks: [],
                text: "default content intro",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        subtitle: "default content subtitle",
        title: "default content title",
      },
      {
        _key: "yI8QHAq7M-jV3LWiq-tS-",
        _type: "block.block10",
        faq: [
          {
            _key: "bbc34664eda8",
            _type: "item",
            content: [
              {
                _key: "f30075ce0eb8",
                _type: "block",
                children: [
                  {
                    _key: "5839495d030a0",
                    _type: "span",
                    marks: [],
                    text: "single use faq content",
                  },
                ],
                markDefs: [],
                style: "normal",
              },
            ],
            title: "single use faq title",
          },
          {
            _key: "4e814be278bb",
            _ref: "27d546e5-374b-4ada-819c-2c8ad2dbc6d3",
            _strengthenOnPublish: {
              template: {
                id: "faq.item",
              },
              type: "faq.item",
            },
            _type: "faq.reference",
            _weak: true,
          },
        ],
        intro: [
          {
            _key: "3142ac3deeef",
            _type: "block",
            children: [
              {
                _key: "5f2ad20e0ba00",
                _type: "span",
                marks: [],
                text: "faq accordions intro",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        title: "faq accordions title",
      },
      {
        _key: "R1WXRp4DWpOiz8tGmYq1c",
        _type: "block.block2",
        intro: [
          {
            _key: "4b146d24ffc6",
            _type: "block",
            children: [
              {
                _key: "de6a9d6a25bb0",
                _type: "span",
                marks: [],
                text: "feature sections with icons intro",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        items: [
          {
            _key: "094a770bf2ca",
            _type: "item",
            intro: [
              {
                _key: "0c4f9f25507d",
                _type: "block",
                children: [
                  {
                    _key: "772e552b3f6f0",
                    _type: "span",
                    marks: [],
                    text: "feature sections item intro",
                  },
                ],
                markDefs: [],
                style: "normal",
              },
            ],
            title: "feature sections item title",
          },
        ],
        title: "feature sections with icons title",
      },
      {
        _key: "myJxpR73vTIC0fFBYrwFX",
        _type: "block.block7",
        intro: [
          {
            _key: "49f255ed42a0",
            _type: "block",
            children: [
              {
                _key: "512e8ab301510",
                _type: "span",
                marks: [],
                text: "item shelf intro",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        items: [
          {
            _key: "3c07be322e57",
            _type: "item",
            title: "item shelf item title",
          },
        ],
        title: "item shelf title",
      },
      {
        _key: "Sco2VfnS4y5KzslKWIIQF",
        _type: "block.block16",
        intro: [
          {
            _key: "7b8261283f64",
            _type: "block",
            children: [
              {
                _key: "5bb8fb3f58830",
                _type: "span",
                marks: [],
                text: "logo grid intro",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        title: "logo grid title",
      },
      {
        _key: "_k78xPfx2i0dVjfC1Pyy_",
        _type: "block.block15",
        body: [
          {
            _key: "858bd42b88c6",
            _type: "block",
            children: [
              {
                _key: "5b0d38b07208",
                _type: "span",
                marks: [],
                text: "split text body",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        intro: [
          {
            _key: "f4df01c25c7f",
            _type: "block",
            children: [
              {
                _key: "7b758bcab3660",
                _type: "span",
                marks: [],
                text: "split text intro",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        title: "split text title",
      },
      {
        _key: "1lnLyOtGkf23PHt01akiU",
        _type: "block.block13",
        intro: [
          {
            _key: "a04ece3249e3",
            _type: "block",
            children: [
              {
                _key: "db86ee702c6b0",
                _type: "span",
                marks: [],
                text: "related resources intro",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        title: "related resources title",
      },
      {
        _key: "jEkBqZkALX7OKCN0gT0cJ",
        _type: "block.block12",
        intro: [
          {
            _key: "aeeea670fff9",
            _type: "block",
            children: [
              {
                _key: "2bb3c85b41090",
                _type: "span",
                marks: [],
                text: "resources feed intro",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        title: "resources feed title",
      },
      {
        _key: "p6sG0dpdKOAVbc4egUfoU",
        _type: "block.block17",
        testimonials: [
          {
            _key: "e578f38f9971",
            _ref: "c513a1bf-3c33-424b-af7b-adec2535e5a3",
            _type: "testimonials.reference",
          },
          {
            _key: "eeecde19cfa6",
            _type: "item",
            content: [
              {
                _key: "e1ce1e9ce408",
                _type: "block",
                children: [
                  {
                    _key: "0b2741a20e240",
                    _type: "span",
                    marks: [],
                    text: "testimonial poster single use content",
                  },
                ],
                markDefs: [],
                style: "normal",
              },
            ],
            title: "testimonial poster single use title",
          },
        ],
        title: "testimonial poster title",
      },
      {
        _key: "Ri0OFvqD9q3Bg-YMPh-ST",
        _type: "block.block1",
        body: [
          {
            _key: "48a15f625e53",
            _type: "block",
            children: [
              {
                _key: "c95e117322d8",
                _type: "span",
                marks: [],
                text: "text and media body",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        footer: [
          {
            _key: "7bd78b61bdaa",
            _type: "block",
            children: [
              {
                _key: "0e8fd663dade",
                _type: "span",
                marks: [],
                text: "text and media footer",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        intro: [
          {
            _key: "46c1bedff892",
            _type: "block",
            children: [
              {
                _key: "01c4d180d0b40",
                _type: "span",
                marks: [],
                text: "text and media intro",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        title: "text and media title",
      },
      {
        _key: "39sODOnfinINbqRO4RYZG",
        _type: "block.block0",
        bodyHTML: "code block body",
        title: "code block title",
      },
    ],
  },
  {
    _id: "15def0ee-3af8-4022-b48e-46ea6a2cdde1",
    content: [
      {
        _key: "4f216e94e3b0",
        _type: "block",
        children: [
          {
            _key: "79386a576e7d",
            _type: "span",
            marks: [],
            text: "testimonial reference content",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    title: "testimonial reference title",
  },
  {
    _id: "c513a1bf-3c33-424b-af7b-adec2535e5a3",
    content: [
      {
        _key: "4f216e94e3b0",
        _type: "block",
        children: [
          {
            _key: "79386a576e7d",
            _type: "span",
            marks: [],
            text: "testimonial poster reference content",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    title: "testimonial poster reference title",
  },
  {
    _id: "27d546e5-374b-4ada-819c-2c8ad2dbc6d3",
    _type: "faq.item",
    content: [
      {
        _key: "f78829493aa9",
        _type: "block",
        children: [
          {
            _key: "188bd92211590",
            _type: "span",
            marks: [],
            text: "reusable use faq content",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    title: "reusable use faq title",
  },
  {
    _id: "testid2",
    _type: "page.content",
    blocks: [
      {
        title: "disabled block",
        _type: "block.block1",
        disabled: true,
      },
      {
        title: "excludeFromSearchIndex block",
        _type: "block.block1",
        excludeFromSearchIndex: true,
      },
    ],
  },
  {
    _id: "no-blocks",
    _type: "page.content",
    seo: {
      excludeFromSitemap: true,
    },
  },
  {
    _id: "empty-blocks",
    _type: "page.content",
    seo: {
      excludeFromSitemap: true,
    },
    blocks: [],
  },
  {
    _id: "locked",
    _type: "page.content",
    locked: true,
    blocks: [{ _type: "block.block1" }],
  },
  {
    _id: "excluded",
    _type: "page.content",
    seo: {
      excludeFromSitemap: true,
    },
    blocks: [{ _type: "block.block1" }],
  },
  {
    _id: "valid-page",
    _type: "page.content",
    blocks: [{}],
  },
];

describe("search export test", () => {
  it("includes only pages with excludeFromSitemap=false", async () => {
    let tree = parse(getExportQuery({}));
    let value = await evaluate(tree, { dataset });
    let result = await value.get();

    expect(result.find((x: any) => x._id === "no-blocks")).toBeFalsy();
    expect(result.find((x: any) => x._id === "empty-blocks")).toBeFalsy();
    expect(result.find((x: any) => x._id === "locked")).toBeFalsy();
    expect(result.find((x: any) => x._id === "excluded")).toBeFalsy();
    expect(result.find((x: any) => x._id === "valid-page")).toBeTruthy();
  });

  it("contains all page text", async () => {
    let tree = parse(getExportQuery({ id: "testid" }));
    let value = await evaluate(tree, { dataset });
    let result = await value.get();
    // console.log(result);

    const title = result[0].title;
    const body = result[0].body.split("\n").map((x: string) => x.trim());

    expect(title).toEqual("search test title");
    expect(body).toContain("search test title");
    expect(body).toContain("seo title");
    expect(body).toContain("seo description");

    // article block
    expect(body).toContain("block article");

    // card grid
    expect(body).toContain("card grid title");
    expect(body).toContain("card grid intro");
    expect(body).toContain("card grid footer");

    expect(body).toContain("composable card title");
    expect(body).toContain("composable card subtitle");
    expect(body).toContain("composable card content");

    expect(body).toContain("testimonial card single use title");
    expect(body).toContain("testimonial card single use content");
    expect(body).toContain("testimonial reference title");
    expect(body).toContain("testimonial reference content");

    // default content
    expect(body).toContain("default content title");
    expect(body).toContain("default content intro");
    expect(body).toContain("default content body");

    // faq accordions
    expect(body).toContain("faq accordions title");
    expect(body).toContain("faq accordions intro");
    expect(body).toContain("single use faq title");
    expect(body).toContain("single use faq content");
    expect(body).toContain("reusable use faq title");
    expect(body).toContain("reusable use faq content");

    // feature section with icons
    expect(body).toContain("feature sections with icons title");
    expect(body).toContain("feature sections with icons intro");
    expect(body).toContain("feature sections item title");
    expect(body).toContain("feature sections item intro");

    // item shelf
    expect(body).toContain("item shelf title");
    expect(body).toContain("item shelf intro");
    expect(body).toContain("item shelf item title");

    // logo grid
    expect(body).toContain("logo grid title");
    expect(body).toContain("logo grid intro");

    // split text
    expect(body).toContain("split text title");
    expect(body).toContain("split text intro");
    expect(body).toContain("split text body");

    // testimonial poster
    expect(body).toContain("testimonial poster title");
    expect(body).toContain("testimonial poster single use title");
    expect(body).toContain("testimonial poster single use content");
    expect(body).toContain("testimonial poster reference title");
    expect(body).toContain("testimonial poster reference content");

    // exclude: code block
    expect(body).not.toContain("code block title");
    expect(body).not.toContain("code block body");

    // exclude: related resources
    expect(body).not.toContain("related resources title");
    expect(body).not.toContain("related resources intro");

    // exclude: resources feed
    expect(body).not.toContain("resources feed title");
    expect(body).not.toContain("resources feed intro");

    // text and media
    expect(body).toContain("text and media title");
    expect(body).toContain("text and media intro");
    expect(body).toContain("text and media body");
    expect(body).toContain("text and media footer");
  });

  it("does not contain excluded block text", async () => {
    let tree = parse(getExportQuery({ id: "testid2" }));
    let value = await evaluate(tree, { dataset });
    let result = await value.get();
    // console.log(result);
    const body = result[0].body.split("\n").map((x: string) => x.trim());

    expect(body).not.toContain("disabled block");
    expect(body).not.toContain("excludeFromSearchIndex block");
  });
});
