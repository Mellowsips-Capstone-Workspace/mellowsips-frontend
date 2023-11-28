import { isEmpty, isUndefined } from "lodash"
import { useCallback, useState } from "react"

type Params = {
    page?: number
    maxResult?: number
    offset?: number
}

type Return = {
    page: number
    offset: number
    maxPage: number
    maxResult: number
    setMaxResult: (maxResult: number) => void
    setPage: (page: number) => void
    setOffset: (offset: number) => void
    resetPagination: () => void
    setPagination: (pagination: { page?: number, offset?: number, maxResult?: number }) => void
}

const usePagination = (init?: Params): Return => {
    const { page = 1, offset = 10, maxResult = 0 } = isEmpty(init) ? { page: 1, offset: 10, maxResult: 0 } : init
    const [state, setState] = useState({ page, offset, maxResult })

    const setPage = useCallback((page: number) => {
        setState(pagination => ({ ...pagination, page }))
    }, [])

    const setMaxResult = useCallback((value: number) => {
        const maxResult = value >= 0 ? value : 0
        setState(pagination => ({ ...pagination, maxResult }))
    }, [])

    const resetPagination = useCallback(() => {
        setState({ page, offset, maxResult })
    }, [offset, page, maxResult])

    const setOffset = useCallback((offset: number) => {
        setState(pagination => ({ ...pagination, offset }))
    }, [])

    const setPagination = useCallback((pagination: { page?: number, offset?: number, maxResult?: number }) => {
        const state = {
            page: isUndefined(pagination.page) ? page : pagination.page,
            offset: isUndefined(pagination.offset) ? offset : pagination.offset,
            maxResult: (isUndefined(pagination.maxResult) || pagination.maxResult < 0) ? maxResult : pagination.maxResult,
        }

        setState(state)
    }, [page, offset, maxResult])

    return {
        page: state.page,
        offset: state.offset,
        maxResult: state.maxResult,
        maxPage: Math.max(0, Math.ceil(state.maxResult / state.offset)),
        setPage,
        setOffset,
        setMaxResult,
        setPagination,
        resetPagination,
    }
}

export default usePagination