import { BlockPreviewToolAction } from "../../types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type BlockPreviewToolsProps = {
  _key: string;
  index: number;
};

const BlockPreviewTools = ({ _key, index }: BlockPreviewToolsProps) => {
  function onActionClick(action: BlockPreviewToolAction) {
    console.log("-----");
    window.parent.postMessage(
      {
        type: "preview-studio-action",
        action,
        blockKey: _key,
        index,
      },
      "*",
    );
  }

  return (
    <div className="absolute left-1 right-1 mt-1 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 grid grid-cols-2">
      {/* edit */}
      <div className="flex gap-1">
        <button
          className="preview-edit-button p-1 rounded bg-[royalblue] text-white transition-colors"
          onClick={() => onActionClick("edit")}
        >
          <svg
            fill="none"
            height="25"
            viewBox="0 0 25 25"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              d="m15 7 3 3m-12 9 1-4 10-10 3 3-10 10z"
              strokeWidth="1.2"
            />
          </svg>
        </button>
        <ActionsDropdown onActionClick={onActionClick} />
      </div>
    </div>
  );
};

export default BlockPreviewTools;

const ActionsDropdown = ({
  onActionClick,
}: {
  onActionClick: (action: BlockPreviewToolAction) => void;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="preview-theme-button p-1 rounded text-white bg-[royalblue] transition-colors place-self-end">
          <svg
            fill="none"
            height="25"
            viewBox="0 0 25 25"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="m14 6.5c0 .82843-.6716 1.5-1.5 1.5s-1.5-.67157-1.5-1.5.6716-1.5 1.5-1.5 1.5.67157 1.5 1.5zm0 6c0 .8284-.6716 1.5-1.5 1.5s-1.5-.6716-1.5-1.5.6716-1.5 1.5-1.5 1.5.6716 1.5 1.5zm-1.5 7.5c.8284 0 1.5-.6716 1.5-1.5s-.6716-1.5-1.5-1.5-1.5.6716-1.5 1.5.6716 1.5 1.5 1.5z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="min-w-[220px] bg-white rounded-md p-1 border shadow-xl ml-10 mt-1">
        <DropdownMenu.Item
          className="flex items-center gap-2 text-sm p-2 leading-none relative select-none outline-none hover:bg-gray-50"
          onSelect={() => onActionClick("delete")}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          Delete block
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="flex items-center gap-2 text-sm p-2 leading-none relative select-none outline-none hover:bg-gray-50"
          onSelect={() => onActionClick("duplicate")}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          Duplicate block
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="flex items-center gap-2 text-sm p-2 leading-none relative select-none outline-none hover:bg-gray-50"
          onSelect={() => onActionClick("move-up")}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
          </svg>
          Move block up
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="flex items-center gap-2 text-sm p-2 leading-none relative select-none outline-none hover:bg-gray-50"
          onSelect={() => onActionClick("move-down")}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
          </svg>
          Move block down
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
