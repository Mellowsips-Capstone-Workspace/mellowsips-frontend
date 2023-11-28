import { useCallback, useEffect, useRef } from "react";

const useOutsideClick = <T extends HTMLElement>(callback: () => void): React.RefObject<T> => {
    const element = useRef<T | null>(null);

    const handleOutsideClick = useCallback((event: MouseEvent) => {
        if (element.current && !element.current.contains(event.target as Node)) {
            callback();
        }
    }, [callback])

    useEffect(() => {
        const document = element.current;

        if (document) {
            window.addEventListener("mousedown", handleOutsideClick)
        }

        return () => {
            if (document) {
                window.removeEventListener("mousedown", handleOutsideClick)
            }
        }
    }, [handleOutsideClick])

    return element
}

export default useOutsideClick;
