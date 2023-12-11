import { ReloadIcon } from "@radix-ui/react-icons"
import usePagination from "hooks/usePagination"
import { isEmpty } from "lodash"
import Button from "modules/Common/Button"
import Loading from "modules/Common/Loading"
import NoResult from "modules/Common/NoResult"
import Pagination from "modules/Common/Pagination/Pagination"
import Review from "modules/Manager/components/Feedback/components/Review"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import StoreService from "services/StoreService"

const StoreReview = () => {
    const { storeId } = useParams()
    const [loading, setLoading] = useState(false)
    const [reviews, setReviews] = useState<Review[]>([])
    const { page, offset, maxPage, setPagination, setPage } = usePagination({ offset: 10, page: 1 })

    const fetch = useCallback(async () => {
        setLoading(true)
        const { status, body } = await StoreService.getStoreReview(storeId!, { pagination: { page, offset } })
        if (status !== 200 || isEmpty(body) || isEmpty(body.data.results)) {
            setReviews([])
            setPagination({ page: 1, maxResult: 0 })
        } else {
            setReviews(body.data.results)
            setPagination({ page: body.data.page, maxResult: body.data.totalItems })
        }
        setLoading(false)
    }, [storeId, page, offset, setPagination])

    useEffect(() => {
        fetch()
    }, [fetch])

    return (
        <div className="p-5 space-y-5 border rounded bg-white">
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
                ) : reviews.length ? (
                    <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-5">
                            {
                                reviews.map(
                                    review => <Review key={review.id} review={review} />
                                )
                            }
                        </div>
                        {
                            maxPage > 0 ? (
                                <div className="flex justify-between items-center font-medium">
                                    <p>{`Trang ${page} trên ${maxPage}`}</p>
                                    <Pagination
                                        page={page}
                                        maxPage={maxPage}
                                        setPage={setPage}
                                    />
                                </div>
                            ) : null
                        }
                    </div>
                ) : <NoResult />
            }
        </div>
    )
}

export default StoreReview