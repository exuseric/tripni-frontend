'use client';
import React from 'react';
import { Link as AriaLink, LinkProps as AriaLinkProps, composeRenderProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '@/lib/react-aria-utils';

interface LinkProps extends AriaLinkProps {
  variant?: 'primary' | 'secondary'
}

const styles = tv({
  extend: focusRing,
  base: 'btn [-webkit-tap-highlight-color:transparent]',
  variants: {
    variant: {
      // primary: 'text-primary underline decoration-primary/60 hover:decoration-primary',
      // secondary: 'text-on-surface underline decoration-on-surface/50 hover:decoration-on-surface',
      primary: 'btn-filled',
      secondary: 'btn-filled-tonal',
      destructive: 'btn-destructive',
      quiet: 'btn-text'
    }
  },
  defaultVariants: {
    variant: 'quiet'
  }
});

export function Link(props: LinkProps) {
  return <AriaLink {...props} className={composeRenderProps(props.className, (className, renderProps) => styles({ ...renderProps, className, variant: props.variant }))} />;
}
