import { isArray, isEmpty, isNull } from 'lodash';
import Document from 'modules/Common/Document';
import Loading from 'modules/Common/Loading';
import SelectStoreManage from 'modules/Common/SelectStoreManage';
import useSelectStore from 'modules/Common/SelectStoreManage/hooks/useSelectStore';
import showToast from 'modules/Common/Toast';
import WidgetCard from 'modules/Common/WidgetCard';
import { FC, useEffect, useState } from 'react';
import DashboardService from 'services/DashboardService';
import { Product } from 'types/product';
import { toCurrency } from 'utils/text';

type ProductItem = Product & {
    numberOfPurchases: number
}

type TopProductProps = {
    className?: string
    range: { startDate: string | null, endDate: string | null }
}

const TopProduct: FC<TopProductProps> = ({ className, range }) => {

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<ProductItem[]>([])

    const { loading: loadingStore, setStoreId, storeId, stores } = useSelectStore()

    useEffect(() => {
        if (isEmpty(storeId)) {
            return
        }
        (
            async () => {
                const { endDate, startDate } = range

                const filter = {
                    startDate: (isEmpty(startDate) || isNull(startDate)) ? null : startDate.concat("T00:00:00+07:00"),
                    endDate: (isEmpty(endDate) || isNull(endDate)) ? null : endDate.concat("T00:00:00+07:00"),
                    storeId
                }
                setLoading(true);
                const { status, body } = await DashboardService.getTopProduct({ pagination: { page: 1, offset: 1000 }, filter })

                if (status !== 200 || isEmpty(body) || body.statusCode !== 200 || !isArray(body.data.results)) {
                    setProducts([])
                    showToast(
                        {
                            type: "warning",
                            title: "Thông tin",
                            message: "Hiện tải chưa thể tải được top các sản phẩm bán chạy nhất."
                        }
                    )
                } else {
                    setProducts(body.data.results)
                }
                setLoading(false)
            }
        )()
    }, [range, storeId])

    return (
        <WidgetCard
            className={className}
            descriptionClassName="text-xl font-semibold text-gray-900 mt-1.5 2xl:text-2xl"
            title={
                (
                    <div className='flex justify-between'>
                        <h2 className="font-medium text-main-primary text-lg">Các sản phẩm bán chạy</h2>
                        <div className='w-80 flex-none'>
                            <SelectStoreManage
                                stores={stores}
                                storeId={storeId}
                                showSelectAll={true}
                                loading={loadingStore}
                                setStoreId={setStoreId}
                            />
                        </div>
                    </div>
                )
            }
        >
            {
                (loading || loadingStore) ? (
                    <div className="h-64 mx-auto w-fit flex justify-center items-center space-x-1 p-2 text-xs">
                        <Loading.Circle className="text-main-primary" size={14} />
                        <span className="text-gray-400">Đang tải dữ liệu.</span>
                    </div>
                ) : (
                    <div className='h-64 py-2'>
                        <ul className='max-h-full overflow-y-auto border p-2 rounded space-y-2'>
                            {
                                products.map(
                                    (product) => (
                                        <li key={product.id}>
                                            <div className='flex space-x-4'>
                                                <div className='h-14 w-14 rounded overflow-hidden border flex-none'>
                                                    <Document
                                                        documentId={product.coverImage}
                                                        displayFileName={false}
                                                        loadingMessage={false}
                                                    />
                                                </div>
                                                <div className='grow'>
                                                    <p>{product.name}</p>
                                                    <p className='space-x-1'>
                                                        <span>{toCurrency(product.price)}</span>
                                                        <span className='text-xs italic'>Đã bán: {product.numberOfPurchases}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                )
            }
            <p className="text-gray-500 text-sm text-center italic">
                <span>Thống kê từ ngày </span>
                <span className="font-medium">{range.startDate!.split("-").reverse().join("-")}</span>
                <span> đến </span>
                <span className="font-medium">{isNull(range.endDate) ? "hôm nay" : range.endDate.split("-").reverse().join("-")}.</span>
            </p>

        </WidgetCard>
    )
}


export default TopProduct