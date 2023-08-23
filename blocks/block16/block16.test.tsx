import { act, render, screen } from "../../jest.utils";
import Block16 from "./Block16";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block16", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block16 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block16", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block16 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block16", () => {
  it("renders items", async () => {
    await act(() => {
      render(
        <Block16
          items={[
            {
              _key: "x",
              image: {
                width: 100,
                height: 100,
                src: "https://picsum.photos/100/100",
                alt: "hello",
              },
            },
          ]}
        />,
      );
    });
    expect(screen.getAllByAltText("hello"));
  });
});

describe("Block16", () => {
  it("renders buttons", async () => {
    await act(() => {
      render(<Block16 buttons={[{ label: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
