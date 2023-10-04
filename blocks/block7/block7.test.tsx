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
  it("renders item image", async () => {
    await act(() => {
      render(
        <Block7
          items={[
            {
              _key: "a",
              image: {
                width: 100,
                height: 100,
                src: "https://picsum.photos/100/100",
                alt: "hello",
              },
            },
          ]}
        />,
      );
    });
    expect(screen.getAllByAltText("hello"));
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
