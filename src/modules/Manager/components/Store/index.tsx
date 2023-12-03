import { isEmpty } from "lodash";
import showToast from "modules/Common/Toast";
import { WidgetLoading } from "modules/Common/WaitingPage";
import OpenTimeManage from "modules/Manager/components/OpenTimeManage";
import BasicInfo from "modules/Manager/components/Store/components/BasicInfo";
import ManageCategory from "modules/Manager/components/Store/components/ManageCategory";
import ManageStatus from "modules/Manager/components/Store/components/ManageStatus";
import StoreProvider from "modules/Manager/components/Store/contexts/StoreContext";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageStoreService from "services/ManageStoreService";
import Store from "types/store";

type StoreDetailProps = {
    storeId: string
}

const StoreDetail: FC<StoreDetailProps> = ({ storeId }) => {
    const [store, setStore] = useState<Store>()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const { status, body } = await ManageStoreService.getById(storeId!)
                setLoading(false)

                if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
                    showToast(
                        {
                            type: "warning",
                            title: "Chú ý",
                            message: "Hiện tại không thể tải được thông tin cửa hàng"
                        }
                    )
                    navigate("/stores")
                    return
                }

                setStore(body.data)
            }
        )()
    }, [storeId, navigate])


    const updateStore = useCallback((filed: string, data: any) => {
        setStore(
            store => {
                return {
                    ...store!,
                    [filed]: data
                }
            }
        )
    }, [])


    return (
        <>
            {
                loading ? (
                    <WidgetLoading message='Đang nạp thông tin cửa hàng. Vui lòng đợi trong giây lát!' />
                ) : store ? (
                    <StoreProvider
                        store={store}
                        updateStore={updateStore}
                    >
                        <ManageStatus />
                        <div className="grid grid-cols-3 gap-5">
                            <div className="col-span-2 space-y-5">
                                <BasicInfo />
                                <ManageCategory />
                            </div>
                            <div className="space-y-5">
                                <OpenTimeManage className="py-2 px-5 bg-white rounded" />
                            </div>
                        </div>
                    </StoreProvider>
                ) : null
            }
        </>
    )
}

export default StoreDetail