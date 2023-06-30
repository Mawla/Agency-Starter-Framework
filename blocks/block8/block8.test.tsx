import { act, render, screen } from "../../jest.utils";
import Block8 from "./Block8";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block8", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block8 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block8", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block8 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block8", () => {
  it("renders items", async () => {
    await act(() => {
      render(<Block8 items={[{ title: "Hello", _key: "" }]} />);
    });
    expect(screen.getByText("Hello", { selector: "li" })).toBeInTheDocument();
  });
});
