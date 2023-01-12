import { Link } from "../../components/buttons/Link";
import { PageContext } from "../../context/PageContext";
import { Logo } from "../Nav/Logo";
import { useContext } from "react";

export const FooterLogo = () => {
  const { language } = useContext(PageContext);

  return (
    <Link href={`/${language}`}>
      <Logo />
    </Link>
  );
};
