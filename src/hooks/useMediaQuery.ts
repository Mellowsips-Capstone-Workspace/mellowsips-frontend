import { useEffect, useRef, useState } from "react"

const useMediaQuery = (query: string): boolean => {
    const mediaQuery = useRef(window.matchMedia(query))
    const [matches, setMatches] = useState<boolean>(mediaQuery.current.matches)

    useEffect(() => {
        const { current: mediaQueryEvent } = mediaQuery
        const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches)
        mediaQueryEvent.addEventListener("change", handleChange)
        return () => mediaQueryEvent.removeEventListener("change", handleChange)
    }, [])

    return matches
}

export default useMediaQuery