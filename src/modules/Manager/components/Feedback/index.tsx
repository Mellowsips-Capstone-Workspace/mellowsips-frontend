import { ReloadIcon } from '@radix-ui/react-icons'
import ROLE from 'enums/role'
import usePagination from 'hooks/usePagination'
import { isEmpty } from 'lodash'
import Button from 'modules/Common/Button'
import Loading from 'modules/Common/Loading'
import NoResult from 'modules/Common/NoResult'
import Pagination from 'modules/Common/Pagination/Pagination'
import SelectStoreManage from 'modules/Common/SelectStoreManage'
import useSelectStore from 'modules/Common/SelectStoreManage/hooks/useSelectStore'
import Review from 'modules/Manager/components/Feedback/components/Review'
import { FC, useCallback, useEffect, useState } from 'react'
import StoreService from 'services/StoreService'
import { useAppSelector } from 'stores/root'
import { Principle } from 'types/authenticate'
import { Review as ReviewType } from 'types/store'

const CustomerFeedback: FC = () => {
    const { type, storeId: accountStoreId } = useAppSelector<Principle>(state => state.authenticate.principle!)
    const { loading: storeLoading, stores, storeId, setStoreId } = useSelectStore(null, true)
    const [loading, setLoading] = useState(false)
    const [reviews, setReviews] = useState<ReviewType[]>([])
    const { page, offset, maxPage, setPagination, setPage } = usePagination({ offset: 10, page: 1 })

    const fetch = useCallback(async () => {

        setLoading(true)
        const { status, body } = await StoreService.getStoreReview(
            type === ROLE.OWNER ? storeId! : accountStoreId!,
            {
                pagination: { page, offset }
            }
        )
        if (status !== 200 || isEmpty(body) || isEmpty(body.data.results)) {
            setReviews([])
            setPagination({ page: 1, maxResult: 0 })
        } else {
            setReviews(body.data.results)
            setPagination({ page: body.data.page, maxResult: body.data.totalItems })
        }
        setLoading(false)
    }, [storeId, page, offset, setPagination, type, accountStoreId])

    useEffect(() => {
        fetch()
    }, [fetch])

    return (
        <div className="p-5 space-y-5 border rounded bg-white">
            <div className="flex justify-between">
                <h2 className='text-main-primary font-medium text-lg'>Đánh giá</h2>
                <div className='flex space-x-5'>
                    {
                        (type === ROLE.OWNER && !storeLoading) ? (
                            <div className="w-72" >
                                <SelectStoreManage
                                    stores={stores}
                                    loading={false}
                                    storeId={storeId}
                                    setStoreId={setStoreId}
                                />
                            </div>
                        ) : null
                    }
                    <Button
                        base="none"
                        onClick={fetch}
                        disabled={loading}
                        className="text-sm px-2 rounded font-medium disabled:opacity-80 space-x-1"
                    >
                        {
                            (loading || storeLoading) ? (
                                <Loading.Circle size={12} />
                            ) : (
                                <ReloadIcon height={12} />
                            )
                        }
                        <span>Làm mới</span>
                    </Button>
                </div>

            </div>

            {
                (loading || storeLoading) ? (
                    <div className="mx-auto space-y-1">
                        <div className="w-fit mx-auto opacity-80">
                            <Loading.Circle className="text-main-primary" />
                        </div>
                        <p className="text-center text-opacity-80 italic text-sm">Đang tải dữ liệu</p>
                    </div>
                ) : reviews.length ? (
                    <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-5">
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

export default CustomerFeedback