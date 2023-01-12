import * as RadixTooltip from '@radix-ui/react-tooltip';
import React from 'react';

export type TooltipProps = {
  title: React.ReactElement | React.ReactNode | string;
  children: React.ReactElement | React.ReactNode;
};

export const Tooltip = ({ title, children }: TooltipProps) => {
  return (
    <RadixTooltip.Root delayDuration={250}>
      <RadixTooltip.Trigger>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Content
        side="top"
        align="center"
        className="border border-black border-opacity-25 filter drop-shadow-xl py-3 px-4 bg-white"
      >
        <RadixTooltip.Arrow
          offset={5}
          width={11}
          height={5}
          className="fill-black filter drop-shadow opacity-50"
        />
        {title}
      </RadixTooltip.Content>
    </RadixTooltip.Root>
  );
};

export const TooltipMemo = React.memo(Tooltip);
