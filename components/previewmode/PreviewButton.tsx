import { PageContext } from "../../context/PageContext";
import { getURLForPath } from "../../helpers/sitemap/getURLForPath";
import { useContext } from "react";

export const PreviewButton = ({ pagePath }: { pagePath: string }) => {
  const { language } = useContext(PageContext);

  return (
    <span className="shadow-lg flex gap-2 text-sm uppercase font-bold bg-[#1f2937] items-center">
      <span className="pl-3 pr-1 font-['Helvetica_Neue']">draft document</span>

      <a
        className="p-2 bg-[#1f2937] transition-color hover:underline hover:bg-[#222] border-l border-l-black/80"
        href={`/api/preview/exit-preview?redirect=${getURLForPath(
          null as any,
          pagePath,
          language,
        )}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-5 h-5"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </a>
    </span>
  );
};
