import { act, render, screen } from "../../jest.utils";
import Feed from "./Feed";
import "@testing-library/jest-dom";

describe("Feed", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Feed title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});
