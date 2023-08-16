import { Link } from "../../components/buttons/Link";
import { SimpleImageProps } from "../../components/images/SimpleImage";
import { PageContext } from "../../context/PageContext";
import { ImageType } from "../../types";
import { ComponentType, lazy, useContext } from "react";

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
    <Link href={`/${language}`}>
      <span className="sr-only">Home</span>
      {mobile && (
        <span className="sm:hidden relative">
          <SimpleImage {...mobile} />
        </span>
      )}
      {desktop && (
        <span className="hidden sm:block relative">
          <SimpleImage {...desktop} />
        </span>
      )}
    </Link>
  );
};
