"use client";
import { Checkbox } from "@/components/ui/Checkbox";
import { composeTailwindRenderProps, focusRing } from "@/lib/react-aria-utils";
import { ArrowUp } from "lucide-react";
import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  TableProps as AriaTableProps,
  Button,
  CellProps,
  Collection,
  ColumnProps,
  ColumnResizer,
  composeRenderProps,
  Group,
  ResizableTableContainer,
  RowProps,
  TableBodyProps,
  TableHeaderProps,
  useTableOptions,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

interface TableProps extends Omit<AriaTableProps, "className"> {
  className?: string;
}

export function Table(props: TableProps) {
  return (
    <ResizableTableContainer
      onScroll={props.onScroll}
      className={twMerge(
        "w-full max-h-[320px] overflow-auto scroll-pt-[2.281rem] relative bg-surface box-border border border-outline-variant rounded-lg font-sans",
        props.className,
      )}
    >
      <AriaTable
        {...props}
        className="border-separate border-spacing-0 box-border overflow-hidden has-[>[data-empty]]:h-full"
      />
    </ResizableTableContainer>
  );
}

const columnStyles = tv({
  extend: focusRing,
  base: "px-2 h-5 box-border flex-1 flex gap-1 items-center overflow-hidden",
});

const resizerStyles = tv({
  extend: focusRing,
  base: "w-px px-[8px] translate-x-[8px] box-content py-1 h-5 bg-clip-content bg-outline forced-colors:bg-[ButtonBorder] cursor-col-resize rounded-xs resizing:bg-primary forced-colors:resizing:bg-[Highlight] resizing:w-[2px] resizing:pl-[7px] -outline-offset-2",
});

export function Column(props: ColumnProps) {
  return (
    <AriaColumn
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "box-border h-1 [&:hover]:z-20 focus-within:z-20 text-start text-sm font-semibold text-on-surface cursor-default",
      )}
    >
      {composeRenderProps(props.children, (children, { allowsSorting, sortDirection }) => (
        <div className="flex items-center">
          <Group role="presentation" tabIndex={-1} className={columnStyles}>
            <span className="truncate">{children}</span>
            {allowsSorting && (
              <span
                className={`w-4 h-4 flex items-center justify-center transition ${sortDirection === "descending" ? "rotate-180" : ""
                  }`}
              >
                {sortDirection && (
                  <ArrowUp
                    aria-hidden
                    className="w-4 h-4 text-on-surface-variant forced-colors:text-[ButtonText]"
                  />
                )}
              </span>
            )}
          </Group>
          {!props.width && <ColumnResizer className={resizerStyles} />}
        </div>
      ))}
    </AriaColumn>
  );
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  const { selectionBehavior, selectionMode, allowsDragging } = useTableOptions();

  return (
    <AriaTableHeader
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "sticky top-0 z-10 bg-surface-container/60 backdrop-blur-md rounded-t-lg border-b border-b-outline-variant",
      )}
    >
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && <Column />}
      {selectionBehavior === "toggle" && (
        <AriaColumn
          width={36}
          minWidth={36}
          className="box-border p-2 text-sm font-semibold cursor-default text-start"
        >
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </AriaColumn>
      )}
      <Collection items={props.columns}>{props.children}</Collection>
    </AriaTableHeader>
  );
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return (
    <AriaTableBody
      {...props}
      className="empty:italic empty:text-center empty:text-sm empty:text-on-surface-variant"
    />
  );
}

const rowStyles = tv({
  extend: focusRing,
  base: "group/row relative cursor-default select-none -outline-offset-2 text-on-surface disabled:text-on-surface/20 text-sm hover:bg-surface-container-high pressed:bg-surface-container-highest selected:bg-primary-container selected:hover:bg-primary-container/90 selected:pressed:bg-primary-container/80 last:rounded-b-lg",
});

export function Row<T extends object>({ id, columns, children, ...otherProps }: RowProps<T>) {
  const { selectionBehavior, allowsDragging } = useTableOptions();

  return (
    <AriaRow id={id} {...otherProps} className={rowStyles}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === "toggle" && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaRow>
  );
}

const cellStyles = tv({
  extend: focusRing,
  base: "box-border [-webkit-tap-highlight-color:transparent] border-b border-b-outline-variant group-last/row:border-b-0 p-2 truncate -outline-offset-2 group-last/row:first:rounded-bl-lg group-last/row:last:rounded-br-lg",
});

export function Cell(props: CellProps) {
  return <AriaCell {...props} className={cellStyles} />;
}
