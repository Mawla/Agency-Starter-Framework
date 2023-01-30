import heroBasic from "../../heroes/HeroBasic/HeroBasic.schema";
import moduleBillboard from "../../modules/Billboard/Billboard.schema";
import moduleBreadcrumb from "../../modules/Breadcrumb/Breadcrumb.schema";
import moduleCardGrid from "../../modules/CardGrid/CardGrid.schema";
import moduleGallery from "../../modules/Gallery/Gallery.schema";
import moduleRichText from "../../modules/RichText/Richtext.schema";
import moduleSlides from "../../modules/Slides/Slides.schema";
import moduleStory from "../../modules/Story/Story.schema";
import moduleTextImage from "../../modules/TextImage/TextImage.schema";
import { translateFields } from "../utils/language/field-translation";
import configGeneral from "./documents/config.general";
import configIntegrations from "./documents/config.integrations";
import configSeo from "./documents/config.seo";
import configSocial from "./documents/config.social";
import configTranslations from "./documents/config.translations";
import dialogForm from "./documents/dialog.form";
import dialogRichText from "./documents/dialog.richtext";
import dialogVideo from "./documents/dialog.video";
import footer from "./documents/footer";
import formStatic from "./documents/form.static";
import navigation from "./documents/navigation";
import pageContent from "./documents/page.content";
import pageHome from "./documents/page.home";
import pageNotFound from "./documents/page.notfound";
import modulePreset from "./documents/page.preset";
import pagePressRelease from "./documents/page.pressrelease";
import password from "./documents/password";
import person from "./documents/person";
import redirect from "./documents/redirect";
import studioDivider from "./documents/studio.divider";
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
    password,
    preset,
    redirect,
    richtextBasic,
    richtextFull,
    richtextSimple,
    studioDivider,
    styles,
    video,
  ],

  ...translateFields([
    configGeneral,
    configSeo,
    configTranslations,
    footer,
    navigation,
    pageContent,
    pageHome,
    pageNotFound,
    pagePressRelease,
    person,
  ]),
];
