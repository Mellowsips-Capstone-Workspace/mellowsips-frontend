import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import { isEmpty } from 'lodash'
import Badge from 'modules/Common/Badge'
import { TableSkeleton } from 'modules/Common/Skeleton'
import Table from 'modules/Common/Table'
import { FC, useCallback, useEffect, useState } from 'react'
import AdminStoreService from 'services/AdminStoreService'
import Store from 'types/store'

// type AccountItem = Account & {
//     updateAccount: (id: string, account: Account) => void
// }

const { accessor, display } = createColumnHelper<Store>()

const columns = [
    accessor(
        "name",
        {
            header: "Tên",
            cell: ({ getValue }) => getValue(),
            minSize: 150,
        }
    ),
    accessor(
        "isActive",
        {
            header: "Trạng thái",
            cell: ({ getValue }) => getValue() ? (
                <Badge className='text-xs px-0.5' intent="blue">Đang hoạt động</Badge>
            ) : (
                <Badge className='text-xs px-0.5' intent="red">Vô hiệu hoá</Badge>
            ),
            minSize: 150,
        }
    ),
    accessor(
        "email",
        {
            header: "Email",
            cell: ({ getValue }) => getValue() ? getValue() : "N/A",
            minSize: 150,
        }
    ),
    accessor(
        "phone",
        {
            header: "Phone",
            cell: ({ getValue }) => getValue() ? getValue() : "N/A",
            minSize: 150,
        }
    ),
    accessor(
        "updatedBy",
        {
            header: "Cập nhật bởi",
            cell: ({ getValue }) => getValue(),
            minSize: 150,
        }
    ),
    accessor(
        "updatedAt",
        {
            header: "Cập nhật gần nhất",
            cell: ({ getValue }) => format(parseISO(getValue()), 'HH:mm:ss dd-MM-yyyy'),
            minSize: 150,
        }
    ),
    display(
        {
            header: "Hành động",
            cell: () => <span className='hover:text-main-primary'>Chi tiết</span>,
            // cell: ({ row: { original } }) => <AccountDetail account={original} />,
            minSize: 150
        }
    )
]

const Partners: FC = () => {
    const [loading, setLoading] = useState(false)
    const [partners, setPartners] = useState<Store[]>([])

    const fetchData = useCallback(async (page = 1, offset = 1000) => {
        setLoading(true)
        const { status, body } = await AdminStoreService.search({ pagination: { page, offset } })
        setLoading(false)
        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setPartners(body.data.results)
        } else {
            setPartners([])
        }
    }, [])
    const refetch = useCallback(async () => {
        fetchData()
    }, [fetchData])


    useEffect(() => {
        refetch()
    }, [refetch])

    // const updateAccount = useCallback((id: string, account: Account) => {
    //     setAccounts(
    //         accounts => {
    //             const updated = [...accounts]
    //             const index = updated.findIndex((account) => account.id === id)
    //             updated.splice(index, 1, account)
    //             return updated
    //         }
    //     )
    // }, [])

    return (
        <div className="bg-white p-5 shadow rounded">
            {
                loading ? (
                    <TableSkeleton column={5} />
                ) : (
                    <Table<Store>
                        columns={columns}
                        data={partners}
                        refetch={refetch}
                        columnVisibility={
                            {
                                updatedAt: false,
                                updatedBy: false
                            }
                        }
                    />
                )
            }
        </div>
    )
}

export default Partners