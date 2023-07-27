import { act, render, screen } from "../../jest.utils";
import Block14 from "./Block14";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block14", () => {
  it("renders body", async () => {
    await act(() => {
      render(<Block14 body={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});
