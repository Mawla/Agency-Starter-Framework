import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { isLanguage } from "../../languages";
import { usePathname } from "next/navigation";

export const FooterBreadcrumb = () => {
  const pathname = usePathname() || "";
  const isHomepage = pathname === "/" || isLanguage(pathname?.replace("/", ""));
  if (isHomepage) return null;

  return (
    <div className="pb-4 mb-4 border-b border-b-gray-200 text-base text-gray-500">
      <Breadcrumb />
    </div>
  );
};
