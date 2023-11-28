import { useEffect, useRef } from 'react';

const useComponentWillMount = (callback: () => void) => {
    const fn = useRef<() => void>(callback)
    useEffect(() => {
        fn.current()
    }, [])
}

export default useComponentWillMount