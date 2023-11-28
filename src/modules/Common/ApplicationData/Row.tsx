import { ClipboardIcon } from "@radix-ui/react-icons"
import { FC, ReactNode, useId } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "shadcn/ui/tooltip"
import { copyToClipboard } from "utils/text"

type ReactNodeProps = {
    children: ReactNode,
    className?: string
}

export const Label: FC<ReactNodeProps> = ({ children }) => {
    return (
        <div className="opacity-50 font-semibold">
            {children}
        </div>
    )
}

export const Value: FC<ReactNodeProps> = ({ children, className }) => {
    const id = useId()
    const handleCopy = () => {
        const element = document.getElementById(id)
        if (element) {
            copyToClipboard(element.innerText)
        }
    }

    return (
        <div className={`border rounded ${className ? className : ""}`}>
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <div className="flex items-center space-x-2 px-3 py-1">
                        <button
                            type="button"
                            className="opacity-50 group"
                            onClick={handleCopy}
                        >
                            <ClipboardIcon />
                        </button>
                        <TooltipTrigger asChild >
                            <div
                                className="grow block w-full text-left truncate"
                                id={id}
                            >
                                {children}
                            </div>
                        </TooltipTrigger>
                    </div>
                    <TooltipContent align="start" side="bottom">
                        {children}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>


        </div>
    )
}