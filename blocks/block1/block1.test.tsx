import { act, render, screen } from "../../jest.utils";
import Block1 from "./Block1";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block1", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block1 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block1", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block1 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block1", () => {
  it("renders features", async () => {
    await act(() => {
      render(<Block1 features={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block1", () => {
  it("renders image", async () => {
    await act(() => {
      render(
        <Block1
          image={{
            width: 100,
            height: 100,
            src: "https://picsum.photos/100/100",
            alt: "hello",
          }}
        />,
      );
    });
    expect(screen.getAllByAltText("hello"));
  });
});
