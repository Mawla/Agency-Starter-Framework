import cx from 'classnames';
import React from 'react';

export type FigCaptionProps = {
  caption: string;
  className?: string;
};

export const FigCaption = ({ caption, className }: FigCaptionProps) => {
  if (!caption?.trim().length) return null;
  return (
    <figcaption className={cx('text-sm leading-relaxed prose-current', className)}>
      {caption}
    </figcaption>
  );
};

export default React.memo(FigCaption);
