"use client";
import { CalendarGridHeader, CalendarHeader } from "@/components/ui/Calendar";
import { composeTailwindRenderProps, focusRing } from "@/lib/react-aria-utils";
import {
  RangeCalendar as AriaRangeCalendar,
  RangeCalendarProps as AriaRangeCalendarProps,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  DateValue,
  Text,
} from "react-aria-components";
import { tv } from "tailwind-variants";

export interface RangeCalendarProps<T extends DateValue> extends Omit<
  AriaRangeCalendarProps<T>,
  "visibleDuration"
> {
  errorMessage?: string;
}

const cell = tv({
  extend: focusRing,
  base: "w-full h-full flex items-center justify-center rounded-full forced-color-adjust-none text-on-surface",
  variants: {
    selectionState: {
      none: "group-hover:bg-surface-container-high group-pressed:bg-surface-container-highest",
      middle: [
        "group-hover:bg-primary/20 forced-colors:group-hover:bg-[Highlight]",
        "group-invalid:group-hover:bg-error/20 forced-colors:group-invalid:group-hover:bg-[Mark]",
        "group-pressed:bg-primary/30 forced-colors:group-pressed:bg-[Highlight] forced-colors:text-[HighlightText]",
        "group-invalid:group-pressed:bg-error/30 forced-colors:group-invalid:group-pressed:bg-[Mark]",
      ],
      cap: "bg-primary group-invalid:bg-error forced-colors:bg-[Highlight] forced-colors:group-invalid:bg-[Mark] text-on-primary forced-colors:text-[HighlightText]",
    },
    isDisabled: {
      true: "text-on-surface/20 forced-colors:text-[GrayText]",
    },
  },
});

export function RangeCalendar<T extends DateValue>({
  errorMessage,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <AriaRangeCalendar
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "font-sans w-[calc(9*var(--spacing)*7)] max-w-full @container",
      )}
    >
      <CalendarHeader />
      <CalendarGrid className="[&_td]:px-0 [&_td]:py-px border-spacing-0">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className="group w-[calc(100cqw/7)] aspect-square text-sm outline cursor-default outside-month:text-on-surface/20 selected:bg-primary-container forced-colors:selected:bg-[Highlight] invalid:selected:bg-error/20 forced-colors:invalid:selected:bg-[Mark] [td:first-child_&]:rounded-s-full selection-start:rounded-s-full [td:last-child_&]:rounded-e-full selection-end:rounded-e-full [-webkit-tap-highlight-color:transparent]"
            >
              {({
                formattedDate,
                isSelected,
                isSelectionStart,
                isSelectionEnd,
                isFocusVisible,
                isDisabled,
              }) => (
                <span
                  className={cell({
                    selectionState:
                      isSelected && (isSelectionStart || isSelectionEnd)
                        ? "cap"
                        : isSelected
                          ? "middle"
                          : "none",
                    isDisabled,
                    isFocusVisible,
                  })}
                >
                  {formattedDate}
                </span>
              )}
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-error">
          {errorMessage}
        </Text>
      )}
    </AriaRangeCalendar>
  );
}
