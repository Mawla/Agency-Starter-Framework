import { Link } from "../../components/buttons/Link";
import { SimpleImageProps } from "../../components/images/SimpleImage";
import { PageContext } from "../../context/PageContext";
import { getLanguagePath } from "../../languages";
import { ImageType } from "../../types";
import { ComponentType, Suspense, lazy, useContext } from "react";

type FooterLogoProps = {
  mobile?: ImageType;
  desktop?: ImageType;
};

const SimpleImage = lazy<ComponentType<SimpleImageProps>>(
  () =>
    import(
      /* webpackChunkName: "SimpleImage" */ "../../components/images/SimpleImage"
    ),
);

export const FooterLogo = ({ mobile, desktop }: FooterLogoProps) => {
  const { language } = useContext(PageContext);

  return (
    <Link href={getLanguagePath(language)}>
      <span className="sr-only">Home</span>
      <Suspense>
        {mobile && (
          <div className="sm:hidden relative">
            <SimpleImage {...mobile} />
          </div>
        )}
        {desktop && (
          <div className="hidden sm:block relative">
            <SimpleImage {...desktop} />
          </div>
        )}
      </Suspense>
    </Link>
  );
};
