import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { PageContext } from "../../context/PageContext";
import { isLanguage } from "../../languages";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export const FooterBreadcrumb = () => {
  const { breadcrumb } = useContext(PageContext);
  const pathname = usePathname() || "";
  const isHomepage = pathname === "/" || isLanguage(pathname?.replace("/", ""));
  if (isHomepage) return null;
  if (breadcrumb === null) return null;

  return (
    <div className="pb-4 mb-10 text-[14px] relative">
      <span className="absolute inset-x-0 h-px block opacity-10 bottom-0 bg-current" />
      <Breadcrumb />
    </div>
  );
};
