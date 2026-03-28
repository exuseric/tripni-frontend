"use client";
import { Label } from "@/components/ui/Field";
import { composeTailwindRenderProps } from "@/lib/react-aria-utils";
import { AlertTriangle } from "lucide-react";
import { Meter as AriaMeter, MeterProps as AriaMeterProps } from "react-aria-components";

export interface MeterProps extends AriaMeterProps {
  label?: string;
}

export function Meter({ label, ...props }: MeterProps) {
  return (
    <AriaMeter
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-2 font-sans max-w-full",
      )}
    >
      {({ percentage, valueText }) => (
        <>
          <div className="flex justify-between gap-2">
            <Label>{label}</Label>
            <span
              className={`text-sm ${percentage >= 80 ? "text-error" : "text-on-surface-variant"}`}
            >
              {percentage >= 80 && (
                <AlertTriangle
                  aria-label="Alert"
                  className="inline-block w-4 h-4 align-text-bottom"
                />
              )}
              {" " + valueText}
            </span>
          </div>
          <div className="w-64 max-w-full h-2 rounded-full bg-surface-container-high outline-1 -outline-offset-1 outline-transparent relative">
            <div
              className={`absolute top-0 left-0 h-full rounded-full ${getColor(percentage)} forced-colors:bg-[Highlight]`}
              style={{ width: percentage + "%" }}
            />
          </div>
        </>
      )}
    </AriaMeter>
  );
}

function getColor(percentage: number) {
  if (percentage < 70) {
    return "bg-primary";
  }

  if (percentage < 80) {
    return "bg-secondary";
  }

  return "bg-error";
}
