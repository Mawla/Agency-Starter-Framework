import blockBlock1 from "../../blocks/block1/block1.schema";
import button from "../../components/buttons/button.schema";
import buttongroup from "../../components/buttons/buttongroup.schema";
import link from "../../components/buttons/link.schema";
import imageSimple from "../../components/images/image.schema";
import portableTextBasic from "../../components/portabletext/portabletextbasic.schema";
import portableTextFull from "../../components/portabletext/portabletextfull.schema";
import portableTextSimple from "../../components/portabletext/portabletextsimple.schema";
import script from "../../components/script/script.schema";
import video from "../../components/video/video.schema";
import footer from "../../layout/footer/footer.schema";
import navigation from "../../layout/navigation/navigation.schema";
import { translateFields } from "../utils/language/field-translation";
import configCMS from "./documents/config.cms";
import configGeneral from "./documents/config.general";
import configIntegrations from "./documents/config.integrations";
import configSeo from "./documents/config.seo";
import configSocial from "./documents/config.social";
import configTranslations from "./documents/config.translations";
import dialogForm from "./documents/dialog.form";
import dialogRichText from "./documents/dialog.richtext";
import dialogVideo from "./documents/dialog.video";
import pageBlog from "./documents/page.blog";
import pageBlogs from "./documents/page.blogs";
import pageCaseStudies from "./documents/page.casestudies";
import pageCaseStudy from "./documents/page.casestudy";
import pageContent from "./documents/page.content";
import pageEvent from "./documents/page.event";
import pageEvents from "./documents/page.events";
import pageGuide from "./documents/page.guide";
import pageGuides from "./documents/page.guides";
import pageHome from "./documents/page.home";
import pageLanding from "./documents/page.landing";
import pageNotFound from "./documents/page.notfound";
import pagePodcast from "./documents/page.podcast";
import pagePodcasts from "./documents/page.podcasts";
import blockPreset from "./documents/page.preset";
import pageSitemap from "./documents/page.sitemap";
import pageTag from "./documents/page.tag";
import pageTool from "./documents/page.tool";
import pageTools from "./documents/page.tools";
import pageVideo from "./documents/page.video";
import pageVideos from "./documents/page.videos";
import password from "./documents/password";
import person from "./documents/person";
import redirect from "./documents/redirect";
import studioDivider from "./documents/studio.divider";
import copypaste from "./objects/copypaste";
import preset from "./objects/preset";
import styles from "./objects/styles";

export const schemaTypes = [
  ...[
    blockBlock1,
    blockPreset,
    button,
    buttongroup,
    configCMS,
    configIntegrations,
    configSocial,
    copypaste,
    dialogForm,
    dialogRichText,
    dialogVideo,
    footer,
    imageSimple,
    link,
    navigation,
    pageBlog,
    pageBlogs,
    pageCaseStudies,
    pageCaseStudy,
    pageContent,
    pageEvent,
    pageEvents,
    pageGuide,
    pageGuides,
    pageHome,
    pageLanding,
    pageNotFound,
    pagePodcast,
    pagePodcasts,
    pageSitemap,
    pageTag,
    pageTool,
    pageTools,
    pageVideo,
    pageVideos,
    password,
    portableTextBasic,
    portableTextFull,
    portableTextSimple,
    preset,
    redirect,
    script,
    studioDivider,
    styles,
    video,
  ],

  ...translateFields([configGeneral, configSeo, configTranslations, person]),
];
