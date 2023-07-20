import { AnswersType } from "..";
import { render } from "../../utils/render-field";

type Props = {
  pascalName: string;
  fields: AnswersType["fields"];
};

export const getTestSnippet = ({ pascalName, fields }: Props) => {
  return `
  import { act, render, screen } from "../../jest.utils";
  import ${pascalName} from "./${pascalName}";
  import "@testing-library/jest-dom";

  jest.mock("next/dist/client/router", () => require("next-router-mock"));

  ${render(
    fields,
    "title",
    `describe("${pascalName}", () => {
    it("renders title", async () => {
      await act(() => {
        render(
          <${pascalName}
            title="Hello"
          />,
        );
      });
      expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
    });
  });`,
  )}

  ${render(
    fields,
    "intro",
    `describe("${pascalName}", () => {
    it("renders intro", async () => {
      await act(() => {
        render(
          <${pascalName}
          intro={<p>Hello</p>}
          />,
        );
      });
      expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
    });
  });`,
  )}

  ${render(
    fields,
    "image",
    `describe("${pascalName}", () => {
    it("renders image", async () => {
      await act(() => {
        render(
          <${pascalName}
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
  });`,
  )}

  ${render(
    fields,
    "items",
    `describe("${pascalName}", () => {
    it("renders items", async () => {
      await act(() => {
        render(
          <${pascalName}
          items={[{ title: "Hello", _key: "" }]}
          />,
        );
      });
      expect(screen.getByText("Hello", { selector: "li" })).toBeInTheDocument();
    });
  });`,
  )}

  ${render(
    fields,
    "buttons",
    `describe("${pascalName}", () => {
    it("renders buttons", async () => {
      await act(() => {
        render(
          <${pascalName}
          buttons={[{ label: "hello" }]}
          />,
        );
      });
      expect(screen.getByText("hello")).toBeInTheDocument();
    });
  });`,
  )}
  `;
};
