import { isEmpty } from "lodash"
import { useEffect, useState } from "react"
import ManageStoreService from "services/ManageStoreService"
import Store from "types/store"

type Return = {
    loading: boolean
    stores: Store[]
    storeId: string | undefined | null
    setStoreId: (storeId: string | null) => void
}

const useSelectStore = (initValue?: string | null, selectAfterLoaded: boolean = true): Return => {
    const [loading, setLoading] = useState(false)
    const [stores, setStores] = useState<Store[]>([])
    const [storeId, setStoreId] = useState<string | null | undefined>(initValue)

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const { status, body } = await ManageStoreService.search({ pagination: { page: 1, offset: 100 } })

                if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results) && body.data.results.length > 0) {
                    setStores(body.data.results)
                    selectAfterLoaded && setStoreId(body.data.results.at(0)!.id)
                } else {
                    setStores([])
                }
                setLoading(false)
            }
        )()
    }, [selectAfterLoaded])

    return {
        loading,
        stores,
        storeId,
        setStoreId
    }
}


export default useSelectStore