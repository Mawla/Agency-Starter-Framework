import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { isLanguage } from "../../languages";
import { usePathname } from "next/navigation";

export const FooterBreadcrumb = () => {
  const pathname = usePathname() || "";
  const isHomepage = pathname === "/" || isLanguage(pathname?.replace("/", ""));
  if (isHomepage) return null;

  return (
    <div className="pb-4 mb-10 text-[14px] relative">
      <span className="absolute inset-x-0 h-px block opacity-10 bottom-0 bg-current" />
      <Breadcrumb />
    </div>
  );
};
