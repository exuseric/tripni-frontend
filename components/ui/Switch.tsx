'use client';
import React from 'react';
import {
  Switch as AriaSwitch,
  SwitchProps as AriaSwitchProps
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '@/lib/react-aria-utils';

export interface SwitchProps extends Omit<AriaSwitchProps, 'children'> {
  children: React.ReactNode;
}

const track = tv({
  extend: focusRing,
  base: 'flex h-5 w-9 box-border px-px items-center shrink-0 cursor-default rounded-full transition duration-200 ease-in-out shadow-inner border border-transparent font-sans',
  variants: {
    isSelected: {
      false: 'bg-surface-container border-outline hover:border-outline-variant group-pressed:bg-surface-container-high',
      true: 'bg-primary forced-colors:bg-[Highlight]! group-pressed:bg-primary/80',
    },
    isDisabled: {
      true: 'bg-surface-container-low forced-colors:group-selected:bg-[GrayText]! border-outline/10 forced-colors:border-[GrayText]',
    }
  }
});

const handle = tv({
  base: 'h-4 w-4 transform rounded-full outline outline-1 -outline-offset-1 outline-transparent shadow-xs transition duration-200 ease-in-out',
  variants: {
    isSelected: {
      false: 'translate-x-0 bg-on-surface',
      true: 'translate-x-[100%] bg-on-primary'
    },
    isDisabled: {
      true: 'forced-colors:outline-[GrayText]'
    }
  },
  compoundVariants: [
    {
      isSelected: false,
      isDisabled: true,
      class: 'bg-on-surface/20'
    },
    {
      isSelected: true,
      isDisabled: true,
      class: 'bg-on-primary/20'
    }
  ]
});

export function Switch({ children, ...props }: SwitchProps) {
  return (
    <AriaSwitch {...props} className={composeTailwindRenderProps(props.className, 'group relative flex gap-2 items-center text-on-surface disabled:text-on-surface/20 forced-colors:disabled:text-[GrayText] text-sm transition [-webkit-tap-highlight-color:transparent]')}>
      {(renderProps) => (
        <>
          <div className={track(renderProps)}>
            <span className={handle(renderProps)} />
          </div>
          {children}
        </>
      )}
    </AriaSwitch>
  );
}
