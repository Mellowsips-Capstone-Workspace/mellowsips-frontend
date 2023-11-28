import { AxiosProgressEvent } from "axios"
import { useCallback, useState } from "react"

type Return = [
    progress: number,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
]

const useAxiosProgress = (): Return => {
    const [progress, setProgress] = useState(0)

    const onUploadProgress = useCallback((progressEvent: AxiosProgressEvent) => {
        const { progress } = progressEvent

        if (typeof progress !== "number" || typeof onUploadProgress !== "function") {
            return
        }

        const percent = Number((progress * 100).toFixed(1))


        if (Number.isInteger(percent)) {
            setProgress(percent)
            return
        }

        setProgress(percent)
    }, [])

    return [progress, onUploadProgress]

}

export default useAxiosProgress