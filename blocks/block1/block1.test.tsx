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
  it("renders body", async () => {
    await act(() => {
      render(<Block1 body={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block1", () => {
  it("renders footer", async () => {
    await act(() => {
      render(<Block1 footer={<p>Hello</p>} />);
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

describe("Block1", () => {
  it("renders mobile image", async () => {
    await act(() => {
      render(
        <Block1
          mobileImage={{
            width: 100,
            height: 100,
            src: "https://picsum.photos/50/50",
            alt: "hello",
          }}
        />,
      );
    });
    expect(screen.getAllByAltText("hello"));
  });
});

describe("Block1", () => {
  it("renders buttons", async () => {
    await act(() => {
      render(<Block1 buttons={[{ label: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
