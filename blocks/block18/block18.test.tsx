import { act, render, screen } from "../../jest.utils";
import Block18 from "./Block18";
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
  it("renders items", async () => {
    await act(() => {
      render(<Block18 items={[{ title: "Hello", _key: "" }]} />);
    });
    expect(screen.getByText("Hello", { selector: "li" })).toBeInTheDocument();
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
