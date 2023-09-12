import { act, render, screen } from "../../jest.utils";
import { demoImage2 } from "../../stories/content";
import Block18, { Block18Props } from "./Block18";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block18", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block18 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block18", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block18 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block18", () => {
  it("renders footer", async () => {
    await act(() => {
      render(<Block18 footer={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block18", () => {
  it("renders items", async () => {
    await act(() => {
      render(
        <Block18
          items={[{ title: "Hello", _key: "a", type: "card.composable" }]}
        />,
      );
    });
    expect(screen.getByText("Hello", { selector: "h3" })).toBeInTheDocument();
  });
});

describe("Block18", () => {
  it("renders buttons", async () => {
    await act(() => {
      render(<Block18 buttons={[{ label: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});

describe("Composable card", () => {
  it("renders content", async () => {
    await act(() => {
      render(
        <Block18
          title="title"
          intro={<p>intro</p>}
          buttons={[{ label: "button", href: "/" }]}
          theme={{
            block: {
              background: "black",
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
                content: <p>card text</p>,
                image: demoImage2,
                buttons: [
                  {
                    label: "card button 1",
                    href: "/",
                  },
                  {
                    label: "card button 2",
                    href: "/",
                  },
                ],
                theme: {
                  card: { background: "black" },
                  title: { size: "md", color: "white" },
                  content: { size: "md", color: "white" },
                  image: { height: "lg", ratio: "16/9", rounded: "xl" },
                },
              },
            ] as Block18Props["items"]
          }
        />,
      );
    });
    expect(screen.getByText("title", { selector: "h2" })).toBeInTheDocument();
    expect(screen.getByText("intro", { selector: "p" })).toBeInTheDocument();
    expect(screen.getByLabelText("button")).toBeInTheDocument();

    expect(
      screen.getByText("card title", { selector: "h3" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("card subtitle", { selector: "h4" }),
    ).toBeInTheDocument();
    expect(screen.getByText("card text")).toBeInTheDocument();
    expect(
      screen.getByText("card button 1", { selector: "a span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("card button 2", { selector: "a span" }),
    ).toBeInTheDocument();
    expect(screen.getAllByAltText("demoimage2"));
  });
});
