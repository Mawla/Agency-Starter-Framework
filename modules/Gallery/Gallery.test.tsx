import { act, render, screen } from "../../jest.utils";
import { demoImage2 } from "../../stories/content";
import Gallery from "./Gallery";
import "@testing-library/jest-dom";

describe("Gallery", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Gallery title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });

  it("renders intro", async () => {
    await act(() => {
      render(<Gallery intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });

  it("renders items", async () => {
    await act(() => {
      render(<Gallery items={[{ image: demoImage2, _key: "x" }]} />);
    });
    expect(screen.getAllByAltText("demoimage2"));
  });
});
