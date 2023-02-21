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

    import {  WrapperProps } from '../../components/module/Wrapper';
    import { BackgroundColorType } from '../../components/module/background.options';
    import { HeadingLevelType } from '../../types';
    import { SpaceType } from '../../components/module/spacing.options';
    import { TitleSizeType, TitleColorType, IntroColorType } from './${lowerName}.options';

    const Wrapper = lazy<ComponentType<WrapperProps>>(
      () => 
        import(/* webpackChunkName: "Wrapper" */ "../../components/module/Wrapper"),
    );

    ${render(
      fields,
      "title",
      `
    import { TitleProps } from "../../components/module/Title";
    const Title = lazy<ComponentType<TitleProps>>(
      () => 
      import(/* webpackChunkName: "Title" */ '../../components/module/Title') 
      );
    `,
    )}

    ${render(
      fields,
      "intro",
      `
    import { TextProps } from "../../components/module/Text";
    const Text = lazy<ComponentType<TextProps>>(
      () => 
        import(/* webpackChunkName: "Text" */ '../../components/module/Text') 
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
        module?: {
          background?: BackgroundColorType;
          space?: SpaceType;
        }
        title?: {
          color?: TitleColorType;
          size?: TitleSizeType;
          level?: HeadingLevelType
        },
        intro?: {
          color?: IntroColorType;
        },
      };
      ${render(fields, "title", "eyebrow?: string;")}
      ${render(fields, "title", "title?: string;")}
      ${render(fields, "intro", "intro?: React.ReactNode;")}
      ${render(fields, "image", "image?: ImageType;")}
      ${render(fields, "buttons", "buttons?: ButtonProps[];")}
      ${render(fields, "items", "items?: { _key?:string;title?:string }[];")}
    };

    export const ${pascalName} = ({ 
      theme,
      ${render(fields, "title", `eyebrow, title,`)}
      ${render(fields, "intro", `intro,`)}
      ${render(fields, "image", `image,`)}
      ${render(fields, "buttons", `buttons,`)}
      ${render(fields, "items", `items,`)}
    }: ${pascalName}Props) => {
      return (
        <Wrapper
          theme={{
            ...theme?.module
          }}
        >
          ${render(
            fields,
            "title",
            `
          {title && (
            <div className="mb-4 md:mb-6">
              <Title size={theme?.title?.size || 'lg'} as={theme?.title?.level} color={theme?.title?.color} eyebrow={eyebrow}>{title}</Title>
            </div>
          )}`,
          )}

          ${render(
            fields,
            "intro",
            `
          {intro && (
            <div className="mb-10 md:mb-14">
              <Text color={theme?.intro?.color}>
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
              <div className="w-96 relative aspect-video">
                <ResponsiveImage {...image} fill className="absolute inset-0" />
              </div>
            )}`,
          )}

          ${render(
            fields,
            "items",
            `
          {items && Boolean(items?.filter(Boolean).length) && (
            <ul className="pt-7 divide-y divide-grey-50">
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

          
        </Wrapper>
      );
    };

    export default React.memo(${pascalName});
    `;
};
