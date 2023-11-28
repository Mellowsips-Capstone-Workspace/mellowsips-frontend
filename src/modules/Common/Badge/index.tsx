import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

export const baseBadge = cva(
    "border rounded",
    {
        variants: {
            intent: {
                green: [
                    "bg-[#d9f2dd] border-[#66FF7A] text-[#00c91b]",
                ],
                blue: [
                    "bg-[#e5f3ff] border-[#66b5ff] text-[#66b5ff]"
                ],
                red: [
                    "bg-[#ffe5e5] border-[#ff6666] text-[#ff2424]"
                ],
                orange: [
                    "bg-[#feefe7] border-[#f46e21] text-[#f46e21]"
                ],
                gray: [
                    "bg-[#f5f5f5] border-[#646464] text-[#646464]"
                ],
                secondary: [
                    "border-main-secondary text-main-secondary"
                ],
                redBold: [
                    "bg-red-500 border-red-500 text-white"
                ],
                secondaryBold: [
                    "bg-main-secondary border-main-secondary text-white"
                ],
                greenBold: [
                    "bg-green-500 border-green-500 text-white"
                ]
            }
        },
        defaultVariants: {
            intent: "green"
        }
    }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLSpanElement> & VariantProps<typeof baseBadge> & {
    asChild?: boolean
}

const Badge = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, intent, asChild = false, ...props }, ref) => {
        const Fragment = asChild ? Slot : "span"
        return (
            <Fragment
                ref={ref}
                {...props}
                className={(baseBadge({ intent, className }))}
            />
        )
    }
)

export default Badge