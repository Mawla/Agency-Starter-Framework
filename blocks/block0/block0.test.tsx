import { act, render, screen } from "../../jest.utils";
import Block0 from "./Block0";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block0", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block0 bodyHTML="<p>hello</p>" />);
    });
    expect(screen.getByTitle("iframe")).toBeInTheDocument();
  });
});
