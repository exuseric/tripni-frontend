"use client";
import { composeTailwindRenderProps } from "@/lib/react-aria-utils";
import { ColorSwatch as AriaColorSwatch, ColorSwatchProps } from "react-aria-components";

export function ColorSwatch(props: ColorSwatchProps) {
  return (
    <AriaColorSwatch
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "w-8 h-8 box-border rounded-md border border-outline-variant",
      )}
      style={({ color }) => ({
        background: `linear-gradient(${color}, ${color}),
          repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
      })}
    />
  );
}
