import { isString } from "lodash"
import { FC, HTMLAttributes, ReactNode } from "react"
type NoResultProps = HTMLAttributes<HTMLDivElement> & {
    message?: ReactNode
}

const NoResult: FC<NoResultProps> = ({ className = "mx-auto py-1 space-y-1", message = "Không có kết quả", ...props }) => {
    return (
        <div
            className={className}
            {...props}
        >
            <img className="mx-auto block w-8 h-8" src="/images/no-result.png" />

            {
                isString(message) ? (
                    <p className="text-center text-sm text-gray-500">{message}</p>
                ) : message
            }

        </div>
    )
}

export default NoResult