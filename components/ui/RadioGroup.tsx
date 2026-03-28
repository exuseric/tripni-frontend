"use client";
import { Description, FieldError, Label } from "@/components/ui/Field";
import { composeTailwindRenderProps, focusRing } from "@/lib/react-aria-utils";
import { ReactNode } from "react";
import {
  composeRenderProps,
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  RadioGroupProps as RACRadioGroupProps,
  RadioProps,
  ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";

export interface RadioGroupProps extends Omit<RACRadioGroupProps, "children"> {
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function RadioGroup(props: RadioGroupProps) {
  return (
    <RACRadioGroup
      {...props}
      className={composeTailwindRenderProps(props.className, "group flex flex-col gap-2 font-sans")}
    >
      <Label>{props.label}</Label>
      <div className="flex group-orientation-vertical:flex-col gap-2 group-orientation-horizontal:gap-4 text-on-surface">
        {props.children}
      </div>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </RACRadioGroup>
  );
}

const styles = tv({
  extend: focusRing,
  base: "w-4.5 h-4.5 box-border rounded-full border bg-surface transition-all",
  variants: {
    isSelected: {
      false: "border-outline hover:border-outline-variant group-pressed:border-on-surface-variant",
      true: "border-[calc(var(--spacing)*1.5)] border-primary forced-colors:border-[Highlight]! group-pressed:border-primary/80",
    },
    isInvalid: {
      true: "border-error group-pressed:border-error/80 forced-colors:border-[Mark]!",
    },
    isDisabled: {
      true: "border-on-surface/10 forced-colors:border-[GrayText]!",
    },
  },
});

export function Radio(props: RadioProps) {
  return (
    <RACRadio
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex relative gap-2 items-center group text-on-surface disabled:text-on-surface/20 forced-colors:disabled:text-[GrayText] text-sm transition [-webkit-tap-highlight-color:transparent]",
      )}
    >
      {composeRenderProps(props.children, (children, renderProps) => (
        <>
          <div className={styles(renderProps)} />
          {children}
        </>
      ))}
    </RACRadio>
  );
}
