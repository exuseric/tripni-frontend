"use client";
import { ColorThumb } from "@/components/ui/ColorThumb";
import { composeTailwindRenderProps } from "@/lib/react-aria-utils";
import {
  ColorArea as AriaColorArea,
  ColorAreaProps as AriaColorAreaProps,
} from "react-aria-components";

export interface ColorAreaProps extends AriaColorAreaProps { }

export function ColorArea(props: ColorAreaProps) {
  return (
    <AriaColorArea
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "w-full max-w-56 aspect-square rounded-lg bg-surface-container-high forced-colors:bg-[GrayText]",
      )}
      style={({ defaultStyle, isDisabled }) => ({
        ...defaultStyle,
        background: isDisabled ? undefined : defaultStyle.background,
      })}
    >
      <ColorThumb />
    </AriaColorArea>
  );
}
