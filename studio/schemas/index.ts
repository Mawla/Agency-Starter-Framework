import block0 from "../../blocks/block0/block0.schema";
import block1 from "../../blocks/block1/block1.schema";
import block2 from "../../blocks/block2/block2.schema";
import block3 from "../../blocks/block3/block3.schema";
import block4 from "../../blocks/block4/block4.schema";
import block5 from "../../blocks/block5/block5.schema";
import block7 from "../../blocks/block7/block7.schema";
import block10 from "../../blocks/block10/block10.schema";
import block12 from "../../blocks/block12/block12.schema";
import block13 from "../../blocks/block13/block13.schema";
import block14 from "../../blocks/block14/block14.schema";
import block15 from "../../blocks/block15/block15.schema";
import block16 from "../../blocks/block16/block16.schema";
import block17 from "../../blocks/block17/block17.schema";
import block18 from "../../blocks/block18/block18.schema";
import presetBlocks from "../../components/block/block.preset";
import presetBlockTheme from "../../components/block/block.preset.theme";
import presetButton, {
  buttonTheme,
} from "../../components/buttons/button.preset";
import button from "../../components/buttons/button.schema";
import buttongroup from "../../components/buttons/buttongroup.schema";
import link from "../../components/buttons/link.schema";
import composableCard from "../../components/cards/composablecard.schema";
import imageCard from "../../components/cards/imagecard.schema";
import testimonialCard from "../../components/cards/testimonialcard.schema";
import { cssDecoration } from "../../components/decorations/cssdecoration.schema";
import presetDecoration from "../../components/decorations/decoration.preset";
import {
  decoration,
  decorations,
  decorationWrapper,
} from "../../components/decorations/decoration.schema";
import faq, { faqItem } from "../../components/faq/faq.schema";
import highlight from "../../components/highlight/highlight.schema";
import imageSimple from "../../components/images/image.schema";
import portableTextBasic from "../../components/portabletext/portabletextbasic.schema";
import portableTextFull from "../../components/portabletext/portabletextfull.schema";
import portableTextPlain from "../../components/portabletext/portabletextplain.schema";
import portableTextSimple from "../../components/portabletext/portabletextsimple.schema";
import script from "../../components/script/script.schema";
import testimonials, {
  testimonialItem,
} from "../../components/testimonials/testimonials.schema";
import presetTextTheme from "../../components/text/text.preset.theme";
import presetTitleTheme from "../../components/title/title.preset.theme";
import video from "../../components/video/video.schema";
import footer from "../../layout/footer/footer.schema";
import navigation from "../../layout/navigation/navigation.schema";
import { translateFields } from "../utils/language/field-translation";
import configCMS from "./documents/config.cms";
import configDeployment from "./documents/config.deployment";
import configGeneral from "./documents/config.general";
import configIcons from "./documents/config.icons";
import configIntegrations from "./documents/config.integrations";
import configSeo from "./documents/config.seo";
import configSocial from "./documents/config.social";
import configTheme from "./documents/config.theme";
import configTranslations from "./documents/config.translations";
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
import pageMediaCoverage from "./documents/page.mediacoverage";
import pageMediaCoverageArticle from "./documents/page.mediacoveragearticle";
import pageNews from "./documents/page.news";
import pageNewsarticle from "./documents/page.newsarticle";
import pageNewsroom from "./documents/page.newsroom";
import pageNotFound from "./documents/page.notfound";
import pagePodcast from "./documents/page.podcast";
import pagePodcasts from "./documents/page.podcasts";
import pagePressRelease from "./documents/page.pressrelease";
import pagePressReleases from "./documents/page.pressreleases";
import pagePricing from "./documents/page.pricing";
import pageResources from "./documents/page.resources";
import pageSearch from "./documents/page.search";
import pageSitemap from "./documents/page.sitemap";
import pageTag from "./documents/page.tag";
import pageTags from "./documents/page.tags";
import pageTool from "./documents/page.tool";
import pageTools from "./documents/page.tools";
import pageVideo from "./documents/page.video";
import pageVideos from "./documents/page.videos";
import password from "./documents/password";
import person from "./documents/person";
import pricingFeature from "./documents/pricing.feature";
import pricingPlan from "./documents/pricing.plan";
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
    block12,
    block13,
    block14,
    block15,
    block16,
    block17,
    block18,
    block2,
    block3,
    block4,
    block5,
    block7,
    button,
    buttonTheme,
    buttongroup,
    composableCard,
    configCMS,
    configDeployment,
    configIcons,
    configIntegrations,
    configSocial,
    configTheme,
    copypaste,
    decoration,
    decorationWrapper,
    decorations,
    cssDecoration,
    faq,
    footer,
    highlight,
    imageCard,
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
    pageMediaCoverage,
    pageMediaCoverageArticle,
    pageNews,
    pageNewsarticle,
    pageNewsroom,
    pageNotFound,
    pagePodcast,
    pagePodcasts,
    pagePressRelease,
    pagePressReleases,
    pagePricing,
    pageResources,
    pageSearch,
    pageSitemap,
    pageTag,
    pageTags,
    pageTool,
    pageTools,
    pageVideo,
    pageVideos,
    password,
    portableTextBasic,
    portableTextFull,
    portableTextPlain,
    portableTextSimple,
    preset,
    presetBlockTheme,
    presetBlocks,
    presetButton,
    presetDecoration,
    presetTextTheme,
    presetTitleTheme,
    pricingFeature,
    pricingPlan,
    redirect,
    script,
    studioDivider,
    styles,
    swapSchema,
    testimonialCard,
    testimonialItem,
    testimonials,
    video,
  ],

  ...translateFields([
    configGeneral,
    configSeo,
    configTranslations,
    person,
    faqItem,
  ]),
];
