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

    import { DecorationProps } from "../../components/decorations/Decoration";
    import { WrapperProps } from "../../components/block/Wrapper";
    import { BlockThemeType } from "../../components/block/block.options";
    import cx from "clsx";
    import { textAlignClasses } from "../../components/text/text.options";

    const Wrapper = lazy<ComponentType<WrapperProps>>(
      () => 
        import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper"),
    );

    ${render(
      fields,
      "title",
      `
    import { TitleProps } from "../../components/title/Title";
    import { TitleThemeType } from "../../components/title/title.options";
    const Title = lazy<ComponentType<TitleProps>>(
      () => 
      import(/* webpackChunkName: "Title" */ '../../components/title/Title') 
      );
    `,
    )}

    ${render(
      fields,
      "intro",
      `
    import { shouldRenderPortableText } from "../../helpers/utils/portabletext";
    import { PortableTextBlock } from "sanity";
    import { TextProps } from "../../components/text/Text";
    import { TextThemeType } from "../../components/text/text.options";
    const Text = lazy<ComponentType<TextProps>>(
      () => 
        import(/* webpackChunkName: "Text" */ '../../components/text/Text') 
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
        block?: BlockThemeType;
        ${render(fields, "title", `title?: TitleThemeType;`)}
        ${render(fields, "intro", `intro?: TextThemeType`)}
      };
      decorations?: DecorationProps[];
      ${render(fields, "title", "title?: string;")}
      ${render(fields, "intro", "intro?: React.ReactNode;")}
      ${render(fields, "image", "image?: ImageType;")}
      ${render(fields, "buttons", "buttons?: ButtonProps[];")}
      ${render(fields, "items", "items?: { _key?:string;title?:string }[];")}
    }; 

    export const ${pascalName} = ({ 
      theme,
      decorations,
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
          decorations={decorations}
        >
        <div className={cx('flex flex-col gap-6 max-w-4xl', textAlignClasses[theme?.block?.align || "center"])}>
          
          ${render(
            fields,
            "title",
            `
            {title && (
                <Title {...theme?.title} size={theme?.title?.size || "4xl"}>{title}</Title>
        
            )}`,
          )}

          ${render(
            fields,
            "intro",
            `
          {shouldRenderPortableText(intro) && (
              <Text 
                size={theme?.intro?.size || 'xl'} 
                color={theme?.intro?.color}
                weight={theme?.intro?.weight}
                align={theme?.block?.align || "center"}
              >
                <PortableText content={intro as PortableTextBlock[]} />
              </Text>
          )}`,
          )}

          ${render(
            fields,
            "image",
            `
            {image && (
              <div className="w-full relative aspect-video inline-block">
                <ResponsiveImage {...image} fill zoom className="absolute inset-0" />
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
            <div className="mt-6">
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
