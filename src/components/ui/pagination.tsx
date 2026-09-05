import { forwardRef, type ComponentProps } from "react"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button-variants"

const Pagination = ({ className, ...props }: ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = forwardRef<
  HTMLUListElement,
  ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1.5 sm:gap-2", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = forwardRef<
  HTMLLIElement,
  ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  ComponentProps<"button">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <button
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : "ghost",
        size,
      }),
      "w-10 h-10 rounded-full font-semibold transition-all cursor-pointer",
      isActive
        ? "bg-primary text-on-primary shadow-[0_2px_8px_rgba(133,83,0,0.25)] hover:bg-primary/90"
        : "text-on-surface hover:bg-surface-container hover:text-primary",
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="icon"
    className={cn(
      "w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container disabled:opacity-40 disabled:pointer-events-none transition-colors",
      className
    )}
    {...props}
  >
    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="icon"
    className={cn(
      "w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container disabled:opacity-40 disabled:pointer-events-none transition-colors group",
      className
    )}
    {...props}
  >
    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">
      chevron_right
    </span>
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex h-10 w-10 items-center justify-center text-sm font-semibold text-on-surface-variant select-none",
      className
    )}
    {...props}
  >
    ...
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
