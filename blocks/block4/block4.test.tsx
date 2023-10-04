import { act, render, screen } from "../../jest.utils";
import Block4 from "./Block4";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block4", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block4 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });

  it("renders subtitle", async () => {
    await act(() => {
      render(<Block4 subtitle="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h3" })).toBeInTheDocument();
  });
});

describe("Block4", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block4 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });

  it("renders body", async () => {
    await act(() => {
      render(<Block4 body={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block4", () => {
  it("renders image", async () => {
    await act(() => {
      render(
        <Block4
          image={{
            width: 100,
            height: 100,
            src: "https://picsum.photos/100/100?-100x100",
            alt: "hello",
          }}
        />,
      );
    });
    expect(screen.getAllByAltText("hello"));
  });
});

describe("Block4", () => {
  it("renders buttons", async () => {
    await act(() => {
      render(<Block4 buttons={[{ label: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
