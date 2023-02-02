import { render, screen, act } from "../../jest.utils";
import { demoImage, demoImage2 } from "../../stories/content";
import CardGrid, { CardGridProps } from "./CardGrid";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Composable card", () => {
  it("renders content", async () => {
    await act(() => {
      render(
        <CardGrid
          title="title"
          eyebrow="eyebrow"
          intro={<p>intro</p>}
          buttons={[{ label: "button", href: "/" }]}
          theme={{
            module: {
              background: "neutral-100",
              align: "center",
            },
            grid: {
              gapHorizontal: "sm",
              gapVertical: "lg",
              columns: 3,
            },
          }}
          items={
            [
              {
                _key: "card",
                type: "card.composable",
                title: "card title",
                subtitle: "card subtitle",
                text: <p>card text</p>,
                cover: demoImage,
                image: demoImage2,
                icon: "demo",
                buttons: [
                  {
                    label: "card button 1",
                    href: "/",
                    variant: "primary",
                  },
                  {
                    label: "card button 2",
                    href: "/",
                    variant: "tertiary",
                  },
                ],
                theme: {
                  card: { background: "brand-500", align: "right" },
                  title: { size: "md", color: "white" },
                  text: { size: "md", color: "white" },
                  icon: { size: "lg", color: "white" },
                  image: { height: "lg", ratio: "16/9", rounded: "xl" },
                },
              },
            ] as CardGridProps["items"]
          }
        />,
      );
    });
    expect(
      screen.getByText("eyebrow", { selector: "span" }),
    ).toBeInTheDocument();
    expect(screen.getByText("title", { selector: "h2" })).toBeInTheDocument();
    expect(screen.getByText("intro", { selector: "p" })).toBeInTheDocument();
    expect(screen.getByLabelText("button")).toBeInTheDocument();

    expect(
      screen.getByText("card title", { selector: "h3" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("card subtitle", { selector: "span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("card text", { selector: "p" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("card button 1", { selector: "a span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("card button 2", { selector: "a span" }),
    ).toBeInTheDocument();
    expect(screen.getAllByAltText("demoimage"));
    expect(screen.getAllByAltText("demoimage2"));
    expect(screen.getByLabelText("icon demo white")).toBeInTheDocument();
  });
});
