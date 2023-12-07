import { ReloadIcon } from "@radix-ui/react-icons"
import Button from "modules/Common/Button"
import Loading from "modules/Common/Loading"
import NoResult from "modules/Common/NoResult"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import StoreService from "services/StoreService"

const StoreReview = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)

    const fetch = useCallback(async () => {
        setLoading(true)
        await StoreService.getStoreReview(id!)
        setLoading(false)
    }, [id])

    useEffect(() => {
        fetch()
    }, [fetch])
    return (
        <div className="p-5 border rounded bg-white">
            <div className="flex justify-between">
                <h2 className='text-main-primary font-medium text-lg'>Đánh giá</h2>
                <Button
                    base="none"
                    onClick={fetch}
                    disabled={loading}
                    className="text-sm px-2 rounded font-medium disabled:opacity-80 space-x-1"
                >
                    {
                        loading ? (
                            <Loading.Circle size={12} />
                        ) : (
                            <ReloadIcon height={12} />
                        )
                    }
                    <span>Làm mới</span>
                </Button>

            </div>

            {
                loading ? (
                    <div className="mx-auto space-y-1">
                        <div className="w-fit mx-auto opacity-80">
                            <Loading.Circle className="text-main-primary" />
                        </div>
                        <p className="text-center text-opacity-80 italic text-sm">Đang tải dữ liệu</p>
                    </div>
                ) : <NoResult />
            }
        </div>
    )
}

export default StoreReview