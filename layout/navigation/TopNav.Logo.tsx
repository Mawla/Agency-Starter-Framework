import Link from "../../components/buttons/Link";
import { SimpleImageProps } from "../../components/images/SimpleImage";
import { PageContext } from "../../context/PageContext";
import { getLanguagePath } from "../../languages";
import { NavigationProps } from "./Navigation";
import { ComponentType, Suspense, lazy, useContext } from "react";

const SimpleImage = lazy<ComponentType<SimpleImageProps>>(
  () =>
    import(
      /* webpackChunkName: "SimpleImage" */ "../../components/images/SimpleImage"
    ),
);

export type TopNavLogoProps = {
  logo: NavigationProps["logo"];
};

export const TopNavLogo = ({ logo }: TopNavLogoProps) => {
  const { language } = useContext(PageContext);
  if (!logo) return null;

  return (
    <Link href={getLanguagePath(language)} className="inline-block relative">
      <span className="sr-only">Home</span>
      <Suspense>
        {logo?.mobile && (
          <span className="block sm:hidden relative">
            <SimpleImage {...logo?.mobile} priority />
          </span>
        )}
        {logo?.desktop && (
          <span className="hidden sm:block relative">
            <SimpleImage {...logo?.desktop} priority />
          </span>
        )}
      </Suspense>
    </Link>
  );
};
