
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import usePagination from 'hooks/usePagination'
import { isEmpty } from 'lodash'
import Badge from 'modules/Common/Badge'
import Keyword from 'modules/Common/Keyword'
import Pagination from 'modules/Common/Pagination/Pagination'
import { TableSkeleton } from 'modules/Common/Skeleton'
import Table from 'modules/Common/Table'
import { Widget } from 'modules/Layout/Dashboard'
import VoucherCreate from 'modules/Voucher/components/VoucherCreate'
import VoucherModal from 'modules/Voucher/components/VoucherModal'
import { nanoid } from 'nanoid'
import { FC, useCallback, useEffect, useState } from 'react'
import VoucherService from 'services/VoucherService'
import { Voucher } from 'types/voucher'
import { parseGMT7 } from 'utils/date'

type VoucherItem = Voucher & {
    updateVoucher: (id: string, voucher: Voucher) => void
}
const { accessor, display } = createColumnHelper<VoucherItem>()

const columns = [
    accessor(
        "code",
        {
            header: "Mã",
            cell: ({ getValue }) => getValue(),
            minSize: 150,
        }
    ),
    accessor(
        "discountType",
        {
            header: "Thể loại",
            cell: ({ getValue }) => getValue() === "CASH" ? "Mức giảm" : "Theo phần trăm",
            minSize: 150,
        }
    ),
    accessor(
        "quantity",
        {
            header: "Số lượng khả dụng",
            cell: ({ getValue }) => getValue(),
            minSize: 150,
        }
    ),
    accessor(
        "startDate",
        {
            header: "Ngày bắt đầu",
            cell: ({ getValue }) => format(parseGMT7(getValue()), 'HH:mm dd-MM-yyyy'),
            minSize: 150,
        }
    ),
    accessor(
        "endDate",
        {
            header: "Ngày kết thúc",
            cell: ({ getValue }) => format(parseGMT7(getValue()), 'HH:mm dd-MM-yyyy'),
            minSize: 150,
        }
    ),
    display(
        {
            header: "Giá trị",
            cell: ({ row: { original } }) => {
                return (
                    <span className='text-main-primary'>
                        {
                            original.discountType === "CASH" ? original.value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : original.value.toString().concat(" %")
                        }
                    </span>
                )
            },
            minSize: 150
        }
    ),
    display(
        {
            header: "Trạng thái",
            cell: ({ row: { original } }) => {
                const isExpired = isEmpty(original.endDate) ? false : parseGMT7(original.endDate) < new Date()
                const isPending = isEmpty(original.startDate) ? false : parseGMT7(original.startDate) > new Date()

                return isPending ? (
                    <Badge intent="blue" className='text-sm px-1.5'>Sắp điễn ra</Badge>
                ) : isExpired ? (
                    <Badge intent="redBold" className='text-sm px-1.5'>Kết thúc</Badge>
                ) : (
                    <Badge intent="secondaryBold" className='text-sm px-1.5'>Đang diễn ra</Badge>
                )
            },
            minSize: 150
        }
    ),
    display(
        {
            header: "Hành động",
            cell: ({ row: { original } }) => <VoucherModal voucher={original} />,
            minSize: 150
        }
    )
]
const VoucherManage: FC = () => {
    const [keyword, setKeyword] = useState("")
    const [loading, setLoading] = useState(false)
    const [vouchers, setVouchers] = useState<Voucher[]>([])
    const { page, maxPage, setPagination, setPage, offset } = usePagination()

    const fetch = useCallback(async (page = 1, offset = 10, type = "CASH") => {
        setLoading(true)
        const { status, body } = await VoucherService.search({ pagination: { page, offset }, keyword })
        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setVouchers(body.data.results)
            setPagination({ page, maxResult: body.data.totalItems, offset })
        } else {
            setVouchers([])
        }
    }, [setPagination, keyword])

    const refetch = useCallback(async () => {
        setLoading(true)
        const { status, body } = await VoucherService.search({ pagination: { page, offset } })
        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setVouchers(body.data.results)
            setPagination({ page, maxResult: body.data.totalItems, offset })
        } else {
            setVouchers([])
        }
    }, [setPagination, page, offset])

    const updateVoucher = useCallback((id: string, voucher: Voucher) => {
        setVouchers(
            vouchers => {
                const updated = [...vouchers]
                const index = updated.findIndex((voucher) => voucher.id === id)
                updated.splice(index, 1, voucher)
                return updated
            }
        )
    }, [])

    useEffect(() => {
        fetch(page, 10)
    }, [fetch, page])

    return (
        <Widget className='space-y-5'>
            <div className="bg-white rounded px-5 py-2 shadow">
                <h2 className="text-xl font-semibold">Quản lý mã giảm giá</h2>
            </div>
            <div className="w-full p-5 space-y-5 bg-white rounded shadow">
                {
                    loading ? (
                        <TableSkeleton column={5} />
                    ) : (
                        <Table<VoucherItem>
                            key={nanoid()}
                            actions={
                                <div className='flex space-x-5'>

                                    <VoucherCreate refetch={refetch} />
                                    <div className='w-72'>
                                        <Keyword keyword={keyword} setKeyword={setKeyword} />
                                    </div>
                                </div>
                            }
                            columns={columns}
                            data={vouchers.map(voucher => ({ ...voucher, updateVoucher }))}
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
        </Widget>
    )
}

export default VoucherManage