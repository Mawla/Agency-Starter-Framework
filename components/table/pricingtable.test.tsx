import { act, render, screen } from "../../jest.utils";
import { PricingTable } from "./PricingTable";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom";

describe("PricingTable", () => {
  it("renders tooltips", async () => {
    await act(() => {
      render(
        <PricingTable
          features={[
            {
              _id: "1",
              title: "title",
              csv: `,\n(i=tooltip text),`,
            },
          ]}
        />,
      );
    });

    expect(screen.getByLabelText("tooltip")).toBeInTheDocument();
    expect(screen.queryByText("(i=tooltip text)")).not.toBeInTheDocument();
  });

  it("renders icon for yes", async () => {
    await act(() => {
      render(
        <PricingTable
          features={[{ _id: "1", title: "title", csv: `,\nYes,` }]}
        />,
      );
    });

    expect(screen.getByLabelText("yes")).toBeInTheDocument();
    expect(screen.queryByText("Yes")).not.toBeInTheDocument();
  });

  it("renders icon for no", async () => {
    await act(() => {
      render(
        <PricingTable
          features={[{ _id: "1", title: "title", csv: `,\nNo,` }]}
        />,
      );
    });

    expect(screen.getByLabelText("no")).toBeInTheDocument();
    expect(screen.queryByText("No")).not.toBeInTheDocument();
  });

  it("renders icon for x", async () => {
    await act(() => {
      render(
        <PricingTable
          features={[{ _id: "1", title: "title", csv: `,\nX,` }]}
        />,
      );
    });

    expect(screen.getByLabelText("no")).toBeInTheDocument();
    expect(screen.queryByText("X")).not.toBeInTheDocument();
  });
});
