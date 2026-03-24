'use client';
import React from 'react';
import {
  Tree as AriaTree,
  TreeItem as AriaTreeItem,
  TreeItemContent as AriaTreeItemContent,
  Button,
  TreeItemProps as AriaTreeItemProps,
  TreeProps
} from 'react-aria-components';
import { ChevronRight } from "lucide-react";
import { tv } from 'tailwind-variants';
import { Checkbox } from '@/components/ui/Checkbox';
import { composeTailwindRenderProps, focusRing } from '@/lib/react-aria-utils';

const itemStyles = tv({
  extend: focusRing,
  base: 'relative font-sans flex group gap-3 cursor-default select-none py-1 px-3 text-sm text-on-surface bg-surface border-t border-outline-variant first:border-t-0 -outline-offset-2 first:rounded-t-lg last:rounded-b-lg',
  variants: {
    isSelected: {
      false: 'hover:bg-surface-container-high pressed:bg-surface-container-highest',
      true: 'bg-primary-container text-on-primary-container hover:bg-primary-container/90 pressed:bg-primary-container/80 border-y-primary/20 z-20'
    },
    isDisabled: {
      true: 'text-on-surface/20 forced-colors:text-[GrayText] z-10'
    }
  }
});

export function Tree<T extends object>(
  { children, ...props }: TreeProps<T>
) {
  return (
    <AriaTree {...props} className={composeTailwindRenderProps(props.className, 'w-48 max-w-full overflow-auto relative border border-outline-variant rounded-lg bg-surface')}>
      {children}
    </AriaTree>
  );
}

const expandButton = tv({
  extend: focusRing,
  base: "border-0 p-0 bg-transparent shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-start cursor-default [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      true: 'text-on-surface/20 forced-colors:text-[GrayText]'
    }
  }
});

const chevron = tv({
  base: "w-4.5 h-4.5 text-on-surface-variant transition-transform duration-200 ease-in-out",
  variants: {
    isExpanded: {
      true: "transform rotate-90",
    },
    isDisabled: {
      true: 'text-on-surface/20 forced-colors:text-[GrayText]'
    }
  }
});

export interface TreeItemProps extends Partial<AriaTreeItemProps> {
  title: string;
}

export function TreeItem(props: TreeItemProps) {
  return (
    <AriaTreeItem className={itemStyles}  textValue={props.title} {...props}>
      <AriaTreeItemContent {...props}>
        {({ selectionMode, selectionBehavior, hasChildItems, isExpanded, isDisabled }) => (
          <div className={`flex items-center`}>
            {selectionMode !== 'none' && selectionBehavior === 'toggle' && (
              <Checkbox slot="selection" />
            )}
            <div className='shrink-0 w-[calc(calc(var(--tree-item-level)_-_1)_*_calc(var(--spacing)_*_3))]' />
            {hasChildItems ? (
              <Button slot="chevron" className={expandButton({ isDisabled })}>
              <ChevronRight aria-hidden className={chevron({ isExpanded, isDisabled })} />
            </Button>
            ) : <div className='shrink-0 w-8 h-8' />}
            {props.title}
          </div>
        )}
      </AriaTreeItemContent>
      {props.children}
    </AriaTreeItem>
  )
}
