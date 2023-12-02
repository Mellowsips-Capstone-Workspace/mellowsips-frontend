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
import { FC, useCallback, useEffect, useState } from 'react'
import OrderService from 'services/OrderService'
import { Order } from 'types/order'
import { toCurrency } from 'utils/text'

type OrderItem = Order & {
    updateOrder: (id: string, order: Order) => void
}

const { accessor, display } = createColumnHelper<OrderItem>()

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
        "initialTransactionMethod",
        {
            header: "Phương thức",
            cell: ({ getValue }) => {
                const method = getValue()

                return method === "ZALO_PAY" ? (
                    <div className='flex space-x-1 justify-center'>
                        <img className='h-5 w-5 inline-block border rounded' src="/images/zalo-pay.png" />
                        <span className='text-sm text-indigo-500'>
                            Zalo Pay
                        </span>
                    </div>
                ) : (
                    <div className='flex space-x-1 justify-center text-purple-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>

                        <span className='text-sm'>
                            Tiền Mặt
                        </span>
                    </div>
                )
            },
            minSize: 100,
        }
    ),
    display(
        {
            header: "Giá",
            cell: ({ row: { original } }) => {
                return (
                    <>
                        <span className='text-main-primary font-medium'>{toCurrency(original.finalPrice)}</span>
                        {
                            Array.isArray(original.details.vouchers) && original.details.vouchers.length ? (
                                <span className='px-1 text-gray-400'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 inline-block">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>
                                </span>
                            ) : null
                        }
                    </>
                )
            },
            minSize: 150
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
            cell: ({ row: { original } }) => <OrderDetail order={original} />,
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

    const updateOrder = useCallback((id: string, order: Order) => {
        setOrders(
            orders => {
                const orderUpdated = [...orders]
                const index = orderUpdated.findIndex(order => order.id === id)
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
                    <Table<OrderItem>
                        columns={columns}
                        data={orders.map(order => ({ ...order, updateOrder }))}
                        refetch={refetch}
                    />
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