
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:translate-y-[-2px] active:translate-y-[1px]",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground hover:shadow-lg hover:shadow-destructive/30 hover:translate-y-[-2px] active:translate-y-[1px]",
        outline:
          "border border-input bg-background hover:bg-accent/10 hover:text-accent-foreground hover:border-primary/50 hover:translate-y-[-2px] active:translate-y-[1px]",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:shadow-md hover:translate-y-[-2px] active:translate-y-[1px]",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground hover:shadow-sm hover:translate-y-[-2px] active:translate-y-[1px]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-full",
        sm: "h-9 rounded-full px-4",
        lg: "h-11 rounded-full px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center">
          {props.children}
        </span>
        <span className="absolute top-0 left-0 w-20 h-full bg-white/10 transform -skew-x-20 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out z-0"></span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
