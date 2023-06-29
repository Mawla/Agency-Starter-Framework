import { AnswersType } from "..";
import { render } from "../../utils/render-field";

type Props = {
  pascalName: string;
  lowerName: string;
  fields: AnswersType["fields"];
};

export const getReactComponentSnippet = ({
  pascalName,
  lowerName,
  fields,
}: Props) => {
  return `
    import React, { ComponentType, lazy } from "react";

    import cx from "classnames";
    import {  WrapperProps } from '../../components/block/Wrapper';
    import { BackgroundColorType } from '../../components/block/background.options';
    import { HeadingLevelType } from '../../types';
    import { SpaceType } from '../../components/block/spacing.options';
    import { 
      ${render(fields, "title", "TitleSizeType,")} 
      ${render(fields, "title", "TitleColorType,")} 
      ${render(fields, "intro", "IntroColorType, IntroSizeType,")} 
      ${render(fields, "eyebrow", "EyebrowColorType,")} 
      AlignType
    } from './${lowerName}.options';

    const Wrapper = lazy<ComponentType<WrapperProps>>(
      () => 
        import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper"),
    );

    ${render(
      fields,
      "title",
      `
    import { TitleProps } from "../../components/block/Title";
    const Title = lazy<ComponentType<TitleProps>>(
      () => 
      import(/* webpackChunkName: "Title" */ '../../components/block/Title') 
      );
    `,
    )}

    ${render(
      fields,
      "intro",
      `
    import { TextProps } from "../../components/block/Text";
    const Text = lazy<ComponentType<TextProps>>(
      () => 
        import(/* webpackChunkName: "Text" */ '../../components/block/Text') 
    );

    import { PortableTextProps } from "../../components/portabletext/PortableText";
    const PortableText = lazy<ComponentType<PortableTextProps>>(
      () =>
        import(/* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText")
    );
    `,
    )}

    ${render(
      fields,
      "buttons",
      `
    import { ButtonProps } from "../../components/buttons/Button";
    import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
    const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
      () => import(/* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"),
    );`,
    )}
    
    ${render(
      fields,
      "image",
      `
    import { ImageType } from '../../types';
    import { ResponsiveImageProps } from '../../components/images/ResponsiveImage';
    const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
      () =>
        import(
          /* webpackChunkName: "ResponsiveImageProps" */ "../../components/images/ResponsiveImage"
        ),
    );`,
    )}

    export type ${pascalName}Props = {
      theme?: {
        block?: {
          background?: BackgroundColorType;
          space?: SpaceType;
          align?: AlignType;
        }
        ${render(
          fields,
          "eyebrow",
          `
        eyebrow?: {
          color?: EyebrowColorType;
        },`,
        )}
        ${render(
          fields,
          "title",
          `
        title?: {
          color?: TitleColorType;
          size?: TitleSizeType;
          level?: HeadingLevelType
        },`,
        )}
        ${render(
          fields,
          "intro",
          `
        intro?: {
          color?: IntroColorType;
          size?: IntroSizeType;
        },`,
        )}
      };
      ${render(fields, "eyebrow", "eyebrow?: string;")}
      ${render(fields, "title", "title?: string;")}
      ${render(fields, "intro", "intro?: React.ReactNode;")}
      ${render(fields, "image", "image?: ImageType;")}
      ${render(fields, "buttons", "buttons?: ButtonProps[];")}
      ${render(fields, "items", "items?: { _key?:string;title?:string }[];")}
    };

    const alignClasses:Record<AlignType, string> = {
      left: "text-left",
      center: "text-center mx-auto",
      right: "text-right ml-auto",
    };    

    export const ${pascalName} = ({ 
      theme,
      ${render(fields, "eyebrow", `eyebrow,`)}
      ${render(fields, "title", `title,`)}
      ${render(fields, "intro", `intro,`)}
      ${render(fields, "image", `image,`)}
      ${render(fields, "buttons", `buttons,`)}
      ${render(fields, "items", `items,`)}
    }: ${pascalName}Props) => {
      return (
        <Wrapper
          theme={{
            ...theme?.block
          }}
        >
        <div className={cx('max-w-3xl', alignClasses[theme?.block?.align || "center"])}>
          ${render(
            fields,
            "eyebrow",
            `
          {(title || eyebrow) && (
            <div className="mb-6">
              <Title 
                size={theme?.title?.size || '4xl'} 
                as={theme?.title?.level} 
                color={theme?.title?.color} 
                eyebrow={eyebrow} 
                eyebrowColor={theme?.eyebrow?.color}
              >{title}</Title>
            </div>
          )}`,
          )}

          ${
            !fields?.includes("eyebrow") && fields?.includes("title")
              ? `
          {title && (
            <div className="mb-6">
              <Title 
                size={theme?.title?.size || '4xl'} 
                as={theme?.title?.level} 
                color={theme?.title?.color}
              >{title}</Title>
            </div>
          )}`
              : ""
          }

          ${render(
            fields,
            "intro",
            `
          {intro && (
            <div className="mb-6">
              <Text 
                size={theme?.intro?.size || 'xl'} 
                color={theme?.intro?.color}
                align={theme?.block?.align || "center"}
              >
                <PortableText content={intro as any} />
              </Text>
            </div>
          )}`,
          )}

          ${render(
            fields,
            "image",
            `
            {image && (
              <div className="w-96 relative aspect-video inline-block">
                <ResponsiveImage {...image} fill className="absolute inset-0" />
              </div>
            )}`,
          )}

          ${render(
            fields,
            "items",
            `
          {items && Boolean(items?.filter(Boolean).length) && (
            <ul className="pt-8">
              {items?.map(({ title, _key }) => (
                <li key={_key} className="">{title}</li>
              ))}
            </ul>
          )}`,
          )}

          ${render(
            fields,
            "buttons",
            `
          {buttons && Boolean(buttons?.filter(Boolean).length) && (
            <div className="mt-8 lg:mt-12">
              <ButtonGroup items={buttons} />
            </div>
          )}`,
          )}    
          </div>      
        </Wrapper>
      );
    };

    export default React.memo(${pascalName});
    `;
};
