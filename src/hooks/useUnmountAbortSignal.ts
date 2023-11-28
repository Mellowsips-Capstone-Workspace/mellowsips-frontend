import { useCallback, useEffect, useRef } from 'react';

type Return = [
    () => AbortController,
    (reason: string | undefined, resetAbortController: boolean) => void,
]

const useAbortController = (unmountAbort: boolean = false): Return => {
    const abortControllerRef = useRef<AbortController>(new AbortController())

    useEffect(() => {
        if (!unmountAbort) {
            return
        }

        const abortController = abortControllerRef.current

        return () => {

            if (!abortController.signal.aborted) {
                abortController.abort("Unmount component.")
            }
            abortControllerRef.current = new AbortController()
        }
    }, [unmountAbort])

    const abort = useCallback((reason: string | undefined = undefined, resetAbortController: boolean = false) => {
        if (abortControllerRef.current.signal.aborted) {
            return
        }

        abortControllerRef.current.abort(reason)

        if (resetAbortController) {
            abortControllerRef.current = new AbortController()
        }

    }, [])

    const getAbortController = useCallback(() => {
        return abortControllerRef.current
    }, [])

    return [getAbortController, abort]
}

export default useAbortController
