import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary border border-primary/20",
        secondary:
          "bg-secondary-container text-on-secondary-container",
        destructive:
          "bg-error-container text-on-error-container",
        outline:
          "text-on-surface-variant border border-secondary-fixed",
        tertiary:
          "bg-tertiary-container/20 text-tertiary",
        amber:
          "bg-primary-container text-on-primary-container",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
