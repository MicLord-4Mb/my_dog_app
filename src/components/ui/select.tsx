import * as React from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface SelectContextValue {
  value: string
  onValueChange?: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  labels: Record<string, React.ReactNode>
  registerLabel: (value: string, label: React.ReactNode) => void
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select compound components must be rendered within a <Select>")
  }
  return context
}

export interface SelectProps {
  value: string
  onValueChange?: (value: string) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Select({
  value,
  onValueChange,
  open: controlledOpen,
  onOpenChange,
  children,
}: SelectProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  const [labels, setLabels] = React.useState<Record<string, React.ReactNode>>({})

  const registerLabel = React.useCallback((val: string, label: React.ReactNode) => {
    setLabels((prev) => (prev[val] === label ? prev : { ...prev, [val]: label }))
  }, [])

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange,
        open,
        setOpen,
        labels,
        registerLabel,
      }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </SelectContext.Provider>
  )
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <PopoverTrigger asChild>
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-xl border border-secondary-fixed bg-surface-container-low px-4 text-sm text-on-surface shadow-xs transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
        <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 ml-2">
          expand_more
        </span>
      </button>
    </PopoverTrigger>
  )
})
SelectTrigger.displayName = "SelectTrigger"

export interface SelectValueProps {
  placeholder?: string
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { value, labels } = useSelectContext()
  const displayValue = labels[value] ?? placeholder ?? value
  return <span className="truncate">{displayValue}</span>
}

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <PopoverContent
      ref={ref}
      align="start"
      className={cn(
        "p-1 w-[var(--radix-popover-trigger-width)] max-h-60 overflow-y-auto bg-surface-container-lowest rounded-xl shadow-lg border border-secondary-fixed/50",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-0.5">{children}</div>
    </PopoverContent>
  )
})
SelectContent.displayName = "SelectContent"

export interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  children: React.ReactNode
}

export const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange, setOpen, registerLabel } = useSelectContext()
    const isSelected = selectedValue === value

    React.useEffect(() => {
      registerLabel(value, children)
    }, [value, children, registerLabel])

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => {
          onValueChange?.(value)
          setOpen(false)
        }}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-on-surface transition-colors hover:bg-surface-container hover:text-primary cursor-pointer text-left",
          isSelected && "bg-primary/10 text-primary font-semibold",
          className
        )}
        {...props}
      >
        <span className="truncate">{children}</span>
        {isSelected && (
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 ml-2">
            check
          </span>
        )}
      </button>
    )
  }
)
SelectItem.displayName = "SelectItem"
