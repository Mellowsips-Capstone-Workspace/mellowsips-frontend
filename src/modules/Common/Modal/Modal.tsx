import { FC, ReactNode, useCallback } from "react"
import ReactDOM from "react-dom"

type ModalProp = {
    flag: boolean
    className?: string
    innerClassName?: string
    children: ReactNode
    closeOutside?: boolean
    closeModal: () => void
}

const Modal: FC<ModalProp> = ({ flag, children, className, closeModal, innerClassName, closeOutside = true }) => {

    const handleStopOnClickPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }, [])

    return flag ? ReactDOM.createPortal(
        <div
            className={className}
            onClick={closeOutside ? closeModal : undefined}
        >
            <div
                aria-hidden={!flag}
                aria-expanded={flag}
                onClick={handleStopOnClickPropagation}
                className={innerClassName}
            >
                {children}
            </div>
        </div>,
        document.body
    ) : null
}

export default Modal