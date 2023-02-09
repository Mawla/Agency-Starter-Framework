import { Link } from "../../components/buttons/Link";
import { IconLoaderProps } from "../../components/images/IconLoader";
import { useWindowSize } from "../../hooks/useWindowSize";
import { ComponentType, lazy } from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../../components/images/IconLoader"
    ),
);

export const FooterMenu = ({
  title,
  href,
  items,
  current,
}: {
  title?: string;
  href?: string;
  items: { label?: string; href?: string; current?: boolean }[];
  current?: boolean;
}) => {
  const MAX_MOBILE_SIZE = 768;
  const { width } = useWindowSize();

  return (
    <details
      key={title || JSON.stringify(items)}
      open={!width || width > MAX_MOBILE_SIZE ? true : current}
      className="group relative"
    >
      <span className="pointer-events-none absolute -inset-x-4 -top-3 border border-white bottom-0 hidden group-open:block md:group-open:hidden group-open:bg-neutral-100 rounded-lg -z-10" />
      <summary
        className="text-neutral-500 text-xl mb-4 list-none relative"
        onClick={(e) => {
          if (width && width > MAX_MOBILE_SIZE) e.preventDefault();
        }}
      >
        {href ? (
          <Link href={href} className="hover:underline underline-offset-4">
            {title}
          </Link>
        ) : (
          title
        )}

        <IconLoader
          icon="chevron"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4  md:hidden transition-transform duration-75 group-open:rotate-180"
        />
      </summary>

      <ul className="flex flex-col gap-4 pb-6 md:pb-0">
        {items?.map(({ label, href, current }) => {
          return (
            <li
              key={href || label}
              className="text-neutral-900 text-md relative"
            >
              {href ? (
                <Link
                  href={href}
                  className="hover:underline underline-offset-4"
                >
                  {label}
                </Link>
              ) : (
                label
              )}

              {current && (
                <span className="md:hidden bg-action-500 w-0.5 h-5 absolute -left-2 top-0" />
              )}
            </li>
          );
        })}
      </ul>
    </details>
  );
};
