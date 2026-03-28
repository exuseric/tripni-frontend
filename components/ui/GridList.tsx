"use client";
import { Checkbox } from "@/components/ui/Checkbox";
import { composeTailwindRenderProps, focusRing } from "@/lib/react-aria-utils";
import { HTMLAttributes } from "react";
import {
  GridList as AriaGridList,
  GridListHeader as AriaGridListHeader,
  GridListItem as AriaGridListItem,
  Button,
  composeRenderProps,
  GridListItemProps,
  GridListProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export function GridList<T extends object>({ children, ...props }: GridListProps<T>) {
  return (
    <AriaGridList
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "overflow-auto w-[200px] relative bg-surface border border-outline-variant rounded-lg font-sans empty:flex empty:items-center empty:justify-center empty:italic empty:text-sm empty:text-on-surface-variant",
      )}
    >
      {children}
    </AriaGridList>
  );
}

const itemStyles = tv({
  extend: focusRing,
  base: "relative flex gap-3 cursor-default select-none py-2 px-3 text-sm text-on-surface border-t border-outline-variant first:border-t-0 first:rounded-t-lg last:rounded-b-lg last:mb-0 -outline-offset-2",
  variants: {
    isSelected: {
      false: "hover:bg-surface-container-high pressed:bg-surface-container-highest",
      true: "bg-primary-container text-on-primary-container hover:bg-primary-container/90 pressed:bg-primary-container/80 border-y-primary/20 z-20",
    },
    isDisabled: {
      true: "text-on-surface/20 forced-colors:text-[GrayText] z-10",
    },
  },
});

export function GridListItem({ children, ...props }: GridListItemProps) {
  const textValue = typeof children === "string" ? children : undefined;
  return (
    <AriaGridListItem textValue={textValue} {...props} className={itemStyles}>
      {composeRenderProps(
        children,
        (children, { selectionMode, selectionBehavior, allowsDragging }) => (
          <>
            {/* Add elements for drag and drop and selection. */}
            {allowsDragging && <Button slot="drag">≡</Button>}
            {selectionMode !== "none" && selectionBehavior === "toggle" && (
              <Checkbox slot="selection" />
            )}
            {children}
          </>
        ),
      )}
    </AriaGridListItem>
  );
}

export function GridListHeader({ children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <AriaGridListHeader
      {...props}
      className={twMerge(
        "text-sm font-semibold text-on-surface-variant px-4 py-1 -mt-px z-10 bg-surface-container/60 backdrop-blur-md border-y border-outline-variant",
        props.className,
      )}
    >
      {children}
    </AriaGridListHeader>
  );
}
