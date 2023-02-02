export const PreviewButton = ({ pagePath }: { pagePath: string }) => (
  <span className="shadow-lg flex gap-4 bg-[#1f2937] items-center">
    <span className="pl-3 font-['Helvetica_Neue']">preview mode</span>

    <a
      className="p-3 bg-[#1f2937] transition-color hover:underline hover:bg-[#222] border-l border-l-neutral-25"
      href={`/api/preview/exit-preview?redirect=${pagePath}`}
    >
      <span className="w-5 h-5 block">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.0098 3.99001C19.6198 3.60001 18.9898 3.60001 18.5998 3.99001L11.9998 10.59L5.39977 3.99001C5.00977 3.60001 4.37977 3.60001 3.98977 3.99001C3.59977 4.38001 3.59977 5.01001 3.98977 5.40001L10.5898 12L3.98977 18.6C3.59977 18.99 3.59977 19.62 3.98977 20.01C4.37977 20.4 5.00977 20.4 5.39977 20.01L11.9998 13.41L18.5998 20.01C18.9898 20.4 19.6198 20.4 20.0098 20.01C20.3998 19.62 20.3998 18.99 20.0098 18.6L13.4098 12L20.0098 5.40001C20.3998 5.01001 20.3998 4.38001 20.0098 3.99001Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </a>
  </span>
);
