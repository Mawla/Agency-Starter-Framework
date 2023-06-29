import { act, render, screen } from "../../jest.utils";
import Block3 from "./Block3";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block3", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block3 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block3", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block3 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block3", () => {
  it("renders image", async () => {
    await act(() => {
      render(
        <Block3
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

describe("Block3", () => {
  it("renders buttons", async () => {
    await act(() => {
      render(<Block3 buttons={[{ label: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
