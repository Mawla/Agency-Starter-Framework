import { act, render, screen } from "../../jest.utils";
import Block7 from "./Block7";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block7", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block7 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block7", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block7 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block7", () => {
  it("renders items", async () => {
    await act(() => {
      render(<Block7 items={[{ title: "Hello", _key: "" }]} />);
    });
    expect(screen.getByText("Hello", { selector: "li" })).toBeInTheDocument();
  });
});

describe("Block7", () => {
  it("renders buttons", async () => {
    await act(() => {
      render(<Block7 buttons={[{ label: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
