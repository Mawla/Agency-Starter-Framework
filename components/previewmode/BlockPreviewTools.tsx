import { BlockPreviewToolAction } from "../../types";

export type BlockPreviewToolsProps = {
  onActionClick: (action: BlockPreviewToolAction) => void;
};

const BlockPreviewTools = ({ onActionClick }: BlockPreviewToolsProps) => {
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
      </div>

      <div className="flex justify-end gap-1">
        <button
          className="preview-theme-button p-1 rounded text-white bg-[rgb(150,44,35)] transition-colors place-self-end"
          onClick={() => onActionClick("delete")}
        >
          <svg
            fill="none"
            height="25"
            viewBox="0 0 25 25"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m5 6.5h15m-10 0v-2c0-.55228.4477-1 1-1h3c.5523 0 1 .44772 1 1v2m-2.5 2.5v8m3-8-.5 8m-5.5-8 .5 8m8.5-10.5-.929 12.0767c-.0401.521-.4745.9233-.997.9233h-8.14797c-.52254 0-.95698-.4023-.99705-.9233l-.92898-12.0767z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BlockPreviewTools;
