import { cva } from "class-variance-authority";
import { FC, useCallback } from "react";
import toast, { Toast } from "react-hot-toast";

const background = cva(
    "",
    {
        variants: {
            intent: {
                success: [
                    "bg-green-500",
                ],
                info: [
                    "bg-blue-500"
                ],
                error: [
                    "bg-red-500"
                ],
                warning: [
                    "bg-orange-500"
                ]
            }
        },
        defaultVariants: {
            intent: "info"
        }
    }
)

type ToastVariantProps = {
    config: Toast
    title?: string
    message?: string
    type: "success" | "info" | "warning" | "error"
}

const ToastVariant: FC<ToastVariantProps> = ({ config, title, message, type }) => {

    const handleDismiss = useCallback(() => {
        toast.dismiss(config.id)
    }, [config.id])


    return (
        <div
            aria-hidden={!config.visible}
            className={background({ intent: type, class: "w-80 px-3 py-2 rounded-md shadow-lg opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" })}
        >
            <div className="space-y-1">
                <div className='flex space-x-1 items-center overflow-auto'>
                    <div className="h-6 w-6 flex-none rounded-full self-center text-white" >
                        {
                            type === "warning" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            ) : type === "success" ? (
                                <svg className='h-full w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                </svg>

                            ) : type === "info" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-full w-full">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>

                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-full w-full bg-transparent">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                </svg>
                            )
                        }
                    </div>
                    <h2 className="grow truncate font-medium text-white">{title}</h2>
                    <button
                        className='flex-none rounded-full h-6 w-6 p-0.5 text-zinc-200 hover:bg-slate-600 hover:text-white transition-all duration-300'
                        onClick={handleDismiss}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-full w-full bg-transparent">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <p className="text-sm text-white break-words">{message}</p>
            </div>
        </div>
    )
}

type UseToastParams = {
    title?: string
    message?: string
    type: "success" | "info" | "warning" | "error"
}

const showToast = (params: UseToastParams) => {
    const { type = "info", message, title } = params
    toast.custom(
        (config: Toast) => <ToastVariant config={config} type={type} title={title} message={message} />
    )
}

export default showToast