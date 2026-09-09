import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cloneElement, isValidElement } from "react";
import { cn } from "cn";

function Breadcrumb({ ...props }) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }) {
  return <ol data-slot="breadcrumb-list" className={cn("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5", className)} {...props} />;
}

function BreadcrumbItem({ className, ...props }) {
  return <li data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

function BreadcrumbLink({ className, asChild = false, children, ...props }) {
  const styles = cn("transition-colors hover:text-foreground", className);
  if (asChild && isValidElement(children)) {
    return cloneElement(children, { className: cn(styles, children.props.className), ...props });
  }
  return <a data-slot="breadcrumb-link" className={styles} {...props}>{children}</a>;
}

function BreadcrumbPage({ className, ...props }) {
  return <span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page" className={cn("font-normal text-foreground", className)} {...props} />;
}

function BreadcrumbSeparator({ children, className, ...props }) {
  return <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>{children ?? <ChevronRight />}</li>;
}

function BreadcrumbEllipsis({ className, ...props }) {
  return <span data-slot="breadcrumb-ellipsis" role="presentation" aria-hidden="true" className={cn("flex size-9 items-center justify-center", className)} {...props}><MoreHorizontal className="size-4" /><span className="sr-only">More</span></span>;
}

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis };
