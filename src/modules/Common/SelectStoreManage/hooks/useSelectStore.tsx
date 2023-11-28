import { isEmpty } from "lodash"
import { useEffect, useState } from "react"
import ManageStoreService from "services/ManageStoreService"
import Store from "types/store"

type Return = {
    loading: boolean
    stores: Store[]
    storeId: string | undefined
    setStoreId: (storeId: string) => void
}

const useSelectStore = (): Return => {
    const [loading, setLoading] = useState(false)
    const [stores, setStores] = useState<Store[]>([])
    const [storeId, setStoreId] = useState<string>()

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const { status, body } = await ManageStoreService.search({ pagination: { page: 1, offset: 100 } })

                if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
                    setStores(body.data.results)
                } else {
                    setStores([])
                }
                setLoading(false)
            }
        )()
    }, [])

    return {
        loading,
        stores,
        storeId,
        setStoreId
    }
}


export default useSelectStore