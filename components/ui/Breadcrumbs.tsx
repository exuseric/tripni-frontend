"use client";
import { Link } from "@/components/ui/Link";
import { composeTailwindRenderProps } from "@/lib/react-aria-utils";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  BreadcrumbProps,
  BreadcrumbsProps,
  LinkProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Breadcrumbs<T extends object>(props: BreadcrumbsProps<T>) {
  return <AriaBreadcrumbs {...props} className={twMerge("flex gap-1", props.className)} />;
}

export function Breadcrumb(props: BreadcrumbProps & Omit<LinkProps, "className">) {
  return (
    <AriaBreadcrumb
      {...props}
      className={composeTailwindRenderProps(props.className, "flex items-center gap-1")}
    >
      {({ isCurrent }) => (
        <>
          <Link variant="secondary" {...props} />
          {!isCurrent && <ChevronRight className="w-3 h-3 text-on-surface-variant" />}
        </>
      )}
    </AriaBreadcrumb>
  );
}
