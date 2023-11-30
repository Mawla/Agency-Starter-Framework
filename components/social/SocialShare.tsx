import { IconLoaderProps } from "../../components/images/IconLoader";
import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { getURLForPath } from "../../helpers/sitemap/getURLForPath";
import cx from "clsx";
import { ComponentType, lazy, useContext, useEffect, useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../../components/images/IconLoader"
    ),
);

export type SocialShareProps = {
  title?: string;
  direction?: "vertical" | "horizontal";
};

export const SocialShare = ({ title, direction }: SocialShareProps) => {
  const { config } = useContext(SiteContext);

  const { sitemapItem } = useContext(PageContext);
  const [hasLinkCopied, setHasLinkCopied] = useState<boolean>(false);

  const shareURL = getURLForPath(config?.general?.domain, sitemapItem?.path);

  const onCopyLinkClick = () => {
    navigator.clipboard.writeText(shareURL);
    setHasLinkCopied(true);
  };

  // reset link copied state after timeout
  useEffect(() => {
    if (!hasLinkCopied) return;

    function resetHasLinkCopied() {
      setHasLinkCopied(false);
    }

    const timeout = setTimeout(resetHasLinkCopied, 5000);
    return () => clearTimeout(timeout);
  }, [hasLinkCopied]);

  return (
    <div
      className={cx("socialshare flex gap-4", {
        ["flex-col"]: direction === "vertical",
        ["flex-row"]: direction !== "vertical",
      })}
      data-animate="fade-in"
    >
      <FacebookShareButton url={shareURL} quote={title}>
        <IconLoader
          icon="facebook"
          className="block w-5 h-5 hover:scale-125 transition-transform"
          removeColors={false}
        />
      </FacebookShareButton>
      <TwitterShareButton url={shareURL} title={title}>
        <IconLoader
          icon="twitter"
          className="block w-5 h-5 hover:scale-125 transition-transform"
          removeColors={false}
        />
      </TwitterShareButton>
      <LinkedinShareButton url={shareURL} title={title} source={shareURL}>
        <IconLoader
          icon="linkedin"
          className="block w-5 h-5 hover:scale-125 transition-transform"
          removeColors={false}
        />
      </LinkedinShareButton>
      <button onClick={onCopyLinkClick}>
        <IconLoader
          icon={hasLinkCopied ? "check" : "clipboard"}
          className="block w-5 h-5 hover:scale-125 transition-transform"
        />
      </button>
    </div>
  );
};

export default SocialShare;
