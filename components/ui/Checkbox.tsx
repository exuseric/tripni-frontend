"use client";
import { focusRing } from "@/lib/react-aria-utils";
import { Check, Minus } from "lucide-react";
import { Checkbox as AriaCheckbox, CheckboxProps, composeRenderProps } from "react-aria-components";
import { tv } from "tailwind-variants";

const checkboxStyles = tv({
  base: "flex gap-2 items-center group font-sans text-sm transition relative [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      false: "text-on-surface",
      true: "text-on-surface/20 forced-colors:text-[GrayText]",
    },
  },
});

const boxStyles = tv({
  extend: focusRing,
  base: "w-4.5 h-4.5 box-border shrink-0 rounded-sm flex items-center justify-center border transition",
  variants: {
    isSelected: {
      false: "bg-surface border-outline",
      true: "bg-primary border-primary forced-colors:bg-[Highlight]! forced-colors:border-[Highlight]!",
    },
    isInvalid: {
      true: "border-error bg-error/10 forced-colors:border-[Mark]!",
    },
    isDisabled: {
      true: "bg-surface-container-low border-outline/10 forced-colors:border-[GrayText]!",
    },
  },
  compoundVariants: [
    {
      isSelected: true,
      isInvalid: true,
      class: "bg-error border-error",
    },
  ],
});

const iconStyles =
  "w-3.5 h-3.5 text-on-primary group-disabled:text-on-surface/20 forced-colors:text-[HighlightText] pointer-events-none";

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { isSelected, isIndeterminate, ...renderProps }) => (
          <>
            <div
              className={boxStyles({ isSelected: isSelected || isIndeterminate, ...renderProps })}
            >
              {isIndeterminate ? (
                <Minus aria-hidden className={iconStyles} />
              ) : isSelected ? (
                <Check aria-hidden className={iconStyles} />
              ) : null}
            </div>
            {children}
          </>
        ),
      )}
    </AriaCheckbox>
  );
}
