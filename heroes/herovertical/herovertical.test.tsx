import { act, render, screen } from "../../jest.utils";
import HeroVertical from "./HeroVertical";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("HeroVertical", () => {
  it("renders title", async () => {
    await act(() => {
      render(<HeroVertical title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h1" })).toBeInTheDocument();
  });

  it("renders intro", async () => {
    await act(() => {
      render(<HeroVertical intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });

  it("renders image", async () => {
    await act(() => {
      render(
        <HeroVertical
          image={{
            height: 2400,
            src: "https://cdn.sanity.io/images/h6z8r05l/development/1b2721e94193ac7e282d9b9ddda8a8b653546c53-2400x1600.jpg",
            width: 1600,
            alt: "hello",
          }}
        />,
      );
    });
    expect(screen.getAllByAltText("hello"));
  });
});
