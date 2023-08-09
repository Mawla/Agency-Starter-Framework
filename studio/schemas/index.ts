import block0 from "../../blocks/block0/block0.schema";
import block1 from "../../blocks/block1/block1.schema";
import block2 from "../../blocks/block2/block2.schema";
import block3 from "../../blocks/block3/block3.schema";
import block4 from "../../blocks/block4/block4.schema";
import block6 from "../../blocks/block6/block6.schema";
import block8 from "../../blocks/block8/block8.schema";
import block9 from "../../blocks/block9/block9.schema";
import block10 from "../../blocks/block10/block10.schema";
import block11 from "../../blocks/block11/block11.schema";
import block12 from "../../blocks/block12/block12.schema";
import block13 from "../../blocks/block13/block13.schema";
import block14 from "../../blocks/block14/block14.schema";
import block15 from "../../blocks/block15/block15.schema";
import presetBlocks from "../../components/block/block.preset";
import presetDecoration from "../../components/block/decoration.preset";
import {
  decoration,
  decorations,
  decorationWrapper,
} from "../../components/block/decoration.schema";
import presetButton, {
  buttonTheme,
} from "../../components/buttons/button.preset";
import button from "../../components/buttons/button.schema";
import buttongroup from "../../components/buttons/buttongroup.schema";
import link from "../../components/buttons/link.schema";
import faq, { faqItem } from "../../components/faq/faq.schema";
import highlight from "../../components/highlight/highlight.schema";
import imageSimple from "../../components/images/image.schema";
import portableTextBasic from "../../components/portabletext/portabletextbasic.schema";
import portableTextFull from "../../components/portabletext/portabletextfull.schema";
import portableTextSimple from "../../components/portabletext/portabletextsimple.schema";
import script from "../../components/script/script.schema";
import testimonials, {
  testimonialItem,
} from "../../components/testimonials/testimonials.schema";
import video from "../../components/video/video.schema";
import footer from "../../layout/footer/footer.schema";
import navigation from "../../layout/navigation/navigation.schema";
import { translateFields } from "../utils/language/field-translation";
import configCMS from "./documents/config.cms";
import configGeneral from "./documents/config.general";
import configIcons from "./documents/config.icons";
import configIntegrations from "./documents/config.integrations";
import configSeo from "./documents/config.seo";
import configSocial from "./documents/config.social";
import configTheme from "./documents/config.theme";
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
import swapSchema from "./objects/swapschema";

export const schemaTypes = [
  ...[
    block0,
    block1,
    block10,
    block11,
    block12,
    block13,
    block14,
    block15,
    block2,
    block3,
    block4,
    block6,
    block8,
    block9,
    button,
    buttongroup,
    configCMS,
    configIcons,
    configIntegrations,
    configSocial,
    configTheme,
    copypaste,
    decoration,
    decorations,
    decorationWrapper,
    dialogForm,
    dialogRichText,
    dialogVideo,
    faq,
    footer,
    highlight,
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
    presetBlocks,
    presetButton,
    buttonTheme,
    presetDecoration,
    redirect,
    script,
    studioDivider,
    styles,
    swapSchema,
    testimonials,
    video,
  ],

  ...translateFields([
    configGeneral,
    configSeo,
    configTranslations,
    person,
    testimonialItem,
    faqItem,
  ]),
];
