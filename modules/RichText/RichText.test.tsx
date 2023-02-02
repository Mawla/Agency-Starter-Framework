import { act, render, screen } from "../../jest.utils";
import RichText from "./RichText";
import "@testing-library/jest-dom";

describe("RichText", () => {
  it("renders title", async () => {
    await act(() => {
      render(<RichText content={<p>hello</p>} />);
    });
    expect(screen.getByText("hello", { selector: "p" })).toBeInTheDocument();
  });
});
