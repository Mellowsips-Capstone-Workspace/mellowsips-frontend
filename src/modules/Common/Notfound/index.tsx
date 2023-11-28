import { VariantProps, cva } from "class-variance-authority"
import { FC } from "react"
import { Link } from "react-router-dom"
import { cn } from "shadcn/utils"

const buttonVariants = cva(
    "flex flex-col items-center justify-center space-y-5",
    {
        variants: {
            variant: {
                page: "w-screen h-screen",
                widget: "w-screen sm:w-fit h-dashboard-body grow"
            }
        },
        defaultVariants: {
            variant: "widget"
        }
    }
)

type NotFoundProps = VariantProps<typeof buttonVariants> & {
    className?: string
}

const NotFound: FC<NotFoundProps> = ({ className, variant }) => (
    <div
        className={cn(buttonVariants({ variant, className }))}
    >
        <p className="text-lg sm:text-xl font-semibold">Trang bạn đang tìm kiếm hiện không tồn tại</p>
        <img
            className="max-w-xs"
            src="/images/404.png"
        />
        <Link to="/" className="py-1 px-3 bg-main-primary rounded text-white font-medium" >Quay về</Link>
    </div>
)

export default NotFound


