import { act, render, screen } from "../../jest.utils";
import Block10 from "./Block10";
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block10", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block10 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block10", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block10 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block10", () => {
  it("renders faq", async () => {
    await act(() => {
      render(<Block10 faq={[{ title: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});

describe("Block10", () => {
  it("renders buttons", async () => {
    await act(() => {
      render(<Block10 buttons={[{ label: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
