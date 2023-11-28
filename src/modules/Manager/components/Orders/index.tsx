import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import usePagination from 'hooks/usePagination'
import { isEmpty } from 'lodash'
import OrderBadge from 'modules/Common/OrderBadge'
import Pagination from 'modules/Common/Pagination/Pagination'
import { TableSkeleton } from 'modules/Common/Skeleton'
import Table from 'modules/Common/Table'
import CartItem from 'modules/Manager/components/Orders/components/CartItem'
import OrderDetail from 'modules/Manager/components/Orders/components/OrderDetail'
import OrderContextProvider from 'modules/Manager/components/Orders/context/OrderContext'
import { FC, useCallback, useEffect, useState } from 'react'
import OrderService from 'services/OrderService'
import { Order } from 'types/order'
import { toCurrency } from 'utils/text'

const { accessor, display } = createColumnHelper<Order>()

const columns = [
    display(
        {
            header: "Sản phẩm",
            cell: ({ row: { original } }) => (
                <CartItem cartItems={original.details.cartItems}>
                    <span className="hover:cursor-pointer hover:text-main-primary">{original.details.cartItems.length} món</span>
                </CartItem>
            ),
            minSize: 150
        }
    ),
    display(
        {
            header: "Địa điểm",
            cell: ({ row: { original } }) => {
                return (
                    <p className='space-x-1'>
                        <span>{original.details.store.name}</span>
                        <span>({original.qrCode.name})</span>
                    </p>
                )
            },
            minSize: 150
        }
    ),
    accessor(
        "status",
        {
            header: "Trạng thái",
            cell: ({ getValue }) => <OrderBadge status={getValue()} />,
            minSize: 100,
        }
    ),
    accessor(
        "finalPrice",
        {
            header: "Giá",
            cell: ({ getValue }) => <span className='text-main-primary font-medium'>{toCurrency(getValue())}</span>,
            minSize: 100,
        }
    ),
    accessor(
        "createdAt",
        {
            header: "Thời gian tạo",
            cell: ({ getValue }) => format(parseISO(getValue()), 'HH:mm:ss dd-MM-yyyy'),
            minSize: 150,
        }
    ),
    display(
        {
            header: "Hành động",
            cell: ({ row: { original, index } }) => <OrderDetail order={original} index={index} />,
            minSize: 100
        }
    )
]
const Orders: FC = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState<Order[]>([])
    const { page, offset, maxPage, setPagination, setPage } = usePagination()

    const refetch = useCallback(async (page = 1, offset = 10) => {
        setLoading(true)

        const { status, body } = await await OrderService.search({ pagination: { page, offset } })
        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setOrders(body.data.results)
            setPagination({ page, maxResult: body.data.totalItems })
        } else {
            setOrders([])
        }
    }, [setPagination])

    useEffect(() => {
        refetch(page, offset)
    }, [refetch, page, offset])

    const updateOrder = useCallback((index: number, order: Order) => {
        setOrders(
            orders => {
                const orderUpdated = [...orders]
                orderUpdated.splice(index, 1, order)
                return orderUpdated
            }
        )
    }, [])

    return (
        <div className="w-full p-5 space-y-5 bg-white rounded shadow">
            {
                loading ? (
                    <TableSkeleton column={5} />
                ) : (
                    <OrderContextProvider updateOrder={updateOrder}>
                        <Table<Order>
                            columns={columns}
                            data={orders}
                            refetch={refetch}
                        />
                    </OrderContextProvider>
                )

            }
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
    )
}

export default Orders