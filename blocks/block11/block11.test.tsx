import { act, render, screen } from "../../jest.utils";
import Block11 from "./Block11";
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block11", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block11 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block11", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block11 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block11", () => {
  it("renders testimonials", async () => {
    await act(() => {
      render(<Block11 testimonials={[{ title: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});

describe("Block11", () => {
  it("renders buttons", async () => {
    await act(() => {
      render(<Block11 buttons={[{ label: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
