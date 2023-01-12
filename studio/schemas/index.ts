import { translateFields } from "../utils/language/field-translation";
import configGeneral from "./documents/config.general";
import configIntegrations from "./documents/config.integrations";
import configSeo from "./documents/config.seo";
import configSocial from "./documents/config.social";
import configTranslations from "./documents/config.translations";
import footer from "./documents/footer";
import formStatic from "./documents/form.static";
import navigation from "./documents/navigation";
import pageContent from "./documents/page.content";
import pageDepartment from "./documents/page.department";
import pageHome from "./documents/page.home";
import pageJob from "./documents/page.job";
import pageJobs from "./documents/page.jobs";
import pageLocation from "./documents/page.location";
import pageNotFound from "./documents/page.notfound";
import pageOffice from "./documents/page.office";
import modulePreset from "./documents/page.preset";
import pagePressRelease from "./documents/page.pressrelease";
import password from "./documents/password";
import person from "./documents/person";
import redirect from "./documents/redirect";
import sitemap from "./documents/sitemap";
import workableDepartment from "./documents/workable.department";
import workableJob from "./documents/workable.job";
import workableLocation from "./documents/workable.location";
import workableMonitor from "./documents/workable.monitor";
import dialogForm from "./modules/dialog.form";
import dialogRichText from "./modules/dialog.richtext";
import dialogVideo from "./modules/dialog.video";
import heroBasic from "./modules/hero.basic";
import moduleBillboard from "./modules/module.billboard";
import moduleBreadcrumb from "./modules/module.breadcrumb";
import moduleCardGrid from "./modules/module.cardgrid";
import moduleGallery from "./modules/module.gallery";
import moduleRichText from "./modules/module.richtext";
import moduleSlides from "./modules/module.slides";
import moduleStory from "./modules/module.story";
import moduleTextImage from "./modules/module.textimage";
import moduleWorkableApplicationForm from "./modules/module.workableapplicationform";
import studioDivider from "./modules/studio.divider";
import button from "./objects/button";
import buttongroup from "./objects/buttongroup";
import cardComposable from "./objects/card.composable";
import cardImage from "./objects/card.image";
import copypaste from "./objects/copypaste";
import imageSimple from "./objects/image.simple";
import language from "./objects/language";
import link from "./objects/link";
import preset from "./objects/preset";
import richtextBasic from "./objects/richtext.basic";
import richtextFull from "./objects/richtext.full";
import richtextSimple from "./objects/richtext.simple";
import styles from "./objects/styles";
import video from "./objects/video";

export const schemaTypes = [
  ...[
    button,
    buttongroup,
    cardComposable,
    cardImage,
    configIntegrations,
    configSocial,
    copypaste,
    dialogForm,
    dialogRichText,
    dialogVideo,
    formStatic,
    heroBasic,
    imageSimple,
    language,
    link,
    moduleBillboard,
    moduleBreadcrumb,
    moduleCardGrid,
    moduleGallery,
    modulePreset,
    moduleRichText,
    moduleSlides,
    moduleStory,
    moduleTextImage,
    moduleWorkableApplicationForm,
    password,
    preset,
    redirect,
    richtextBasic,
    richtextFull,
    richtextSimple,
    sitemap,
    studioDivider,
    styles,
    video,
    workableDepartment,
    workableJob,
    workableLocation,
    workableMonitor,
  ],

  ...translateFields([
    configGeneral,
    configSeo,
    configTranslations,
    footer,
    navigation,
    pageContent,
    pageDepartment,
    pageHome,
    pageJob,
    pageJobs,
    pageLocation,
    pageNotFound,
    pageOffice,
    pagePressRelease,
    person,
  ]),
];
