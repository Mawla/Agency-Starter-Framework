import portableTextBasic from "../../components/PortableText/PortableTextBasic.schema";
import portableTextFull from "../../components/PortableText/PortableTextFull.schema";
import portableTextSimple from "../../components/PortableText/PortableTextSimple.schema";
import button from "../../components/buttons/Button.schema";
import buttongroup from "../../components/buttons/ButtonGroup.schema";
import link from "../../components/buttons/Link.schema";
import imageSimple from "../../components/images/Image.schema";
import video from "../../components/video/Video.schema";
import heroBasic from "../../heroes/HeroBasic/HeroBasic.schema";
import footer from "../../layout/Footer/Footer.schema";
import navigation from "../../layout/Nav/Nav.schema";
import moduleBillboard from "../../modules/Billboard/Billboard.schema";
import moduleBreadcrumb from "../../modules/Breadcrumb/Breadcrumb.schema";
import moduleCardGrid from "../../modules/CardGrid/CardGrid.schema";
import cardComposable from "../../modules/CardGrid/ComposableCard.schema";
import cardImage from "../../modules/CardGrid/ImageCard.schema";
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
import formStatic from "./documents/form.static";
import pageContent from "./documents/page.content";
import pageHome from "./documents/page.home";
import pageNotFound from "./documents/page.notfound";
import modulePreset from "./documents/page.preset";
import pageSitemap from "./documents/page.sitemap";
import password from "./documents/password";
import person from "./documents/person";
import redirect from "./documents/redirect";
import studioDivider from "./documents/studio.divider";
import copypaste from "./objects/copypaste";
import language from "./objects/language";
import preset from "./objects/preset";
import styles from "./objects/styles";

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
    portableTextBasic,
    portableTextFull,
    portableTextSimple,
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
    pageSitemap,
    person,
  ]),
];
