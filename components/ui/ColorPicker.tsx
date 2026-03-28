"use client";
import { ColorArea } from "@/components/ui/ColorArea";
import { ColorField } from "@/components/ui/ColorField";
import { ColorSlider } from "@/components/ui/ColorSlider";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { Dialog } from "@/components/ui/Dialog";
import { Popover } from "@/components/ui/Popover";
import { focusRing } from "@/lib/react-aria-utils";
import React from "react";
import {
  ColorPicker as AriaColorPicker,
  ColorPickerProps as AriaColorPickerProps,
  Button,
  DialogTrigger,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const buttonStyles = tv({
  extend: focusRing,
  base: "border-0 bg-transparent flex gap-2 items-center cursor-default rounded-xs font-sans text-sm text-on-surface [-webkit-tap-highlight-color:transparent]",
});

export interface ColorPickerProps extends Omit<AriaColorPickerProps, "children"> {
  label?: string;
  children?: React.ReactNode;
}

export function ColorPicker({ label, children, ...props }: ColorPickerProps) {
  return (
    <AriaColorPicker {...props}>
      <DialogTrigger>
        <Button className={buttonStyles}>
          <ColorSwatch />
          <span>{label}</span>
        </Button>
        <Popover placement="bottom start">
          <Dialog className="flex flex-col gap-2">
            {children || (
              <>
                <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness" />
                <ColorSlider colorSpace="hsb" channel="hue" />
                <ColorField label="Hex" />
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
    </AriaColorPicker>
  );
}
