import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-on-primary shadow-md hover:bg-on-primary-fixed hover:shadow-lg hover:-translate-y-0.5",
        destructive:
          "bg-error text-on-error shadow-sm hover:bg-error/90",
        outline:
          "border border-secondary-fixed bg-surface text-on-surface hover:bg-surface-container",
        secondary:
          "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80",
        ghost:
          "text-on-surface hover:bg-surface-container hover:text-primary",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-14 rounded-full px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
