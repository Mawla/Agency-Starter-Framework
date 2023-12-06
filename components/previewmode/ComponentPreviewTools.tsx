import { ComponentPreviewToolAction } from "../../types";

export type ComponentPreviewToolsProps = {
  data: {
    path?: string;
  };
};

export const ComponentPreviewTools = ({ data }: ComponentPreviewToolsProps) => {
  if (!data?.path) return null;

  function onActionClick(action: ComponentPreviewToolAction) {
    window.parent.postMessage(
      {
        type: "preview-studio-action",
        action,
        blockKey: data.path?.match(/(?<=blocks\[_key==")(.*)(?="\])/)?.[0],
        path: data.path,
      },
      "*",
    );
  }

  return (
    <button
      className="absolute preview-edit-button rounded bg-[var(--highlight-color)] text-white transition-colors hidden group-hover/component:block  text-[11px] font-[system-ui] font-normal gap-1 leading-none items-center"
      onClick={() => onActionClick("component-edit")}
    >
      <svg
        fill="none"
        height="18"
        viewBox="0 0 25 25"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke="currentColor"
          d="m15 7 3 3m-12 9 1-4 10-10 3 3-10 10z"
          strokeWidth="1.2"
        />
      </svg>
    </button>
  );
};

export default ComponentPreviewTools;
