import { act, render, screen } from "../../jest.utils";
import Block17 from "./Block17";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block17", () => {
  it("renders testimonials", async () => {
    await act(() => {
      render(<Block17 testimonials={[{ title: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
