import { isEmpty } from "lodash"
import FormikTextField from "modules/Common/FormikTextField"
import Loading from "modules/Common/Loading"
import { FC, useEffect, useState } from "react"
import ManageStoreService from "services/ManageStoreService"
import Store from "types/store"

type StoreSelectProps = {
    showAll?: boolean
}

const StoreSelect: FC<StoreSelectProps> = ({ showAll = true }) => {
    const [loading, setLoading] = useState(false)
    const [stores, setStores] = useState<Store[]>([])

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const { status, body } = await ManageStoreService.search({ pagination: { page: 1, offset: 100 } })
                setLoading(false)

                if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
                    setStores(body.data.results)
                } else {
                    setStores([])
                }
            }
        )()
    }, [])

    return (
        <div className="space-y-2">
            <label className="text-gray-500 font-medium">Cửa hàng</label>
            {
                loading ? (
                    <div className="flex justify-center items-center space-x-1 border p-2 text-xs">
                        <Loading.Circle className="text-main-primary" size={14} />
                        <span className="text-gray-400">Đang tải danh sách cửa hàng</span>
                    </div>
                ) : stores ? (
                    <FormikTextField.DropdownInput
                        options={
                            showAll ? [
                                { label: "Tất cả cửa hàng", value: null },
                                ...stores.map(
                                    ({ id, name }) => ({ label: name, value: id })
                                )
                            ] : stores.map(
                                ({ id, name }) => ({ label: name, value: id })
                            )
                        }
                        name="storeId"
                        placeholder="Chọn cửa hàng"
                    />
                ) : null
            }
        </div>
    )
}

export default StoreSelect