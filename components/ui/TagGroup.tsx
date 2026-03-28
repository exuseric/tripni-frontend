"use client";
import { Description, Label } from "@/components/ui/Field";
import { focusRing } from "@/lib/react-aria-utils";
import { XIcon } from "lucide-react";
import { createContext, useContext } from "react";
import {
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  TagGroupProps as AriaTagGroupProps,
  TagProps as AriaTagProps,
  Button,
  TagList,
  TagListProps,
  Text,
  composeRenderProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const colors = {
  gray: "bg-surface text-on-surface border-outline-variant hover:border-outline",
  green: "bg-primary-container text-on-primary-container border-primary/10 hover:border-primary/20",
  yellow:
    "bg-secondary-container text-on-secondary-container border-secondary/10 hover:border-secondary/20",
  blue: "bg-tertiary-container text-on-tertiary-container border-tertiary/10 hover:border-tertiary/20",
};

type Color = keyof typeof colors;
const ColorContext = createContext<Color>("gray");

const tagStyles = tv({
  extend: focusRing,
  base: "transition cursor-default text-xs rounded-full border px-3 py-0.5 flex items-center max-w-fit gap-1 font-sans [-webkit-tap-highlight-color:transparent]",
  variants: {
    color: {
      gray: "",
      green: "",
      yellow: "",
      blue: "",
    },
    allowsRemoving: {
      true: "pr-1",
    },
    isSelected: {
      true: "bg-primary text-on-primary border-transparent forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-color-adjust-none",
    },
    isDisabled: {
      true: "bg-surface-container-low text-on-surface/20 forced-colors:text-[GrayText]",
    },
  },
  compoundVariants: (Object.keys(colors) as Color[]).map((color) => ({
    isSelected: false,
    isDisabled: false,
    color,
    class: colors[color],
  })),
});

export interface TagGroupProps<T>
  extends
    Omit<AriaTagGroupProps, "children">,
    Pick<TagListProps<T>, "items" | "children" | "renderEmptyState"> {
  color?: Color;
  label?: string;
  description?: string;
  errorMessage?: string;
}

export interface TagProps extends AriaTagProps {
  color?: Color;
}

export function TagGroup<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  renderEmptyState,
  ...props
}: TagGroupProps<T>) {
  return (
    <AriaTagGroup {...props} className={twMerge("flex flex-col gap-2 font-sans", props.className)}>
      <Label>{label}</Label>
      <ColorContext.Provider value={props.color || "gray"}>
        <TagList items={items} renderEmptyState={renderEmptyState} className="flex flex-wrap gap-1">
          {children}
        </TagList>
      </ColorContext.Provider>
      {description && <Description>{description}</Description>}
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-error">
          {errorMessage}
        </Text>
      )}
    </AriaTagGroup>
  );
}

const removeButtonStyles = tv({
  extend: focusRing,
  base: "cursor-default rounded-full transition-[background-color] p-0.5 flex items-center justify-center bg-transparent text-[inherit] border-0 hover:bg-on-surface/10 pressed:bg-on-surface/20",
});

export function Tag({ children, color, ...props }: TagProps) {
  const textValue = typeof children === "string" ? children : undefined;
  const groupColor = useContext(ColorContext);
  return (
    <AriaTag
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tagStyles({ ...renderProps, className, color: color || groupColor }),
      )}
    >
      {composeRenderProps(children, (children, { allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button slot="remove" className={removeButtonStyles}>
              <XIcon aria-hidden className="w-3 h-3" />
            </Button>
          )}
        </>
      ))}
    </AriaTag>
  );
}
