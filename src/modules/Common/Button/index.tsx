import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import React, { forwardRef } from "react"
import { cn } from "shadcn/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80",
    {
        variants: {
            variant: {
                default: "bg-slate-200 text-main-secondary",
                primary: "bg-main-primary text-white",
                secondary: "bg-main-secondary text-white",
                indigo: "bg-indigo-500 text-white",
                orange: "bg-orange-500 text-white",
                red: "bg-red-500 text-white",
                green: "bg-green-500 text-white",
                transparent: "bg-transparent",
            },
            base: {
                none: "",
                default: "px-3 py-1 min-w-20 rounded font-medium"
            }
        },
        defaultVariants: {
            variant: "default",
            base: "default"
        }
    }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, base, asChild = false, ...props }, ref) => {
        const Fragment = asChild ? Slot : "button"
        return (
            <Fragment
                ref={ref}
                {...props}
                className={cn(buttonVariants({ variant, base, className }))}
            />
        )
    }
)

export default Button


