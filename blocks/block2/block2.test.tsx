import { act, render, screen } from "../../jest.utils";
import Block2 from "./Block2";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block2", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block2 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block2", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block2 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block2", () => {
  it("renders items", async () => {
    await act(() => {
      render(<Block2 items={[{ title: "Hello", _key: "" }]} />);
    });
    expect(screen.getByText("Hello", { selector: "h3" })).toBeInTheDocument();
  });
});

describe("Block2", () => {
  it("renders buttons", async () => {
    await act(() => {
      render(<Block2 buttons={[{ label: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
