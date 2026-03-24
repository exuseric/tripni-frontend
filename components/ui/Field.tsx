'use client';
import React from 'react';
import { FieldErrorProps, Group, GroupProps, InputProps, LabelProps, FieldError as RACFieldError, Input as RACInput, Label as RACLabel, Text, TextProps, composeRenderProps } from "react-aria-components";
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '@/lib/react-aria-utils';

export function Label(props: LabelProps) {
  return <RACLabel {...props} className={twMerge('font-sans text-sm text-on-surface font-medium cursor-default w-fit', props.className)} />;
}

export function Description(props: TextProps) {
  return <Text {...props} slot="description" className={twMerge('text-sm text-on-surface-variant', props.className)} />;
}

export function FieldError(props: FieldErrorProps) {
  return <RACFieldError {...props} className={composeTailwindRenderProps(props.className, 'text-sm text-error forced-colors:text-[Mark]')} />
}

export const fieldBorderStyles = tv({
  base: 'transition',
  variants: {
    isFocusWithin: {
      false: 'border-outline-variant hover:border-outline forced-colors:border-[ButtonBorder]',
      true: 'border-primary forced-colors:border-[Highlight]',
    },
    isInvalid: {
      true: 'border-error forced-colors:border-[Mark]'
    },
    isDisabled: {
      true: 'border-outline/10 forced-colors:border-[GrayText]'
    }
  }
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: 'group flex items-center h-9 box-border bg-surface-container-lowest forced-colors:bg-[Field] border rounded-lg overflow-hidden transition',
  variants: fieldBorderStyles.variants
});

export function FieldGroup(props: GroupProps) {
  return <Group {...props} className={composeRenderProps(props.className, (className, renderProps) => fieldGroupStyles({...renderProps, className}))} />;
}

export function Input(props: InputProps) {
  return <RACInput {...props} className={composeTailwindRenderProps(props.className, 'px-3 py-0 min-h-9 flex-1 min-w-0 border-0 outline outline-0 bg-transparent font-sans text-sm text-on-surface placeholder:text-on-surface-variant/50 disabled:text-on-surface/20 disabled:placeholder:text-on-surface-variant/10 [-webkit-tap-highlight-color:transparent]')} />
}
