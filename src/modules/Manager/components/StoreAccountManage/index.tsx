import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import { isEmpty } from 'lodash'
import Badge from 'modules/Common/Badge'
import RoleBadge from 'modules/Common/RoleBadge'
import { TableSkeleton } from 'modules/Common/Skeleton'
import Table from 'modules/Common/Table'
import AccountDetail from 'modules/Manager/components/AccountDetail'
import AddAccount from 'modules/Manager/components/AddAccount'
import { FC, useCallback, useEffect, useState } from 'react'
import ManageAccountService from 'services/ManageAccountService'
import { Account } from 'types/account'

// type QRCodeItem = QRCode & {
//     updateQRCode: (id: string, qr: QRCode) => void
// }

const { accessor, display } = createColumnHelper<Account>()

const columns = [
    accessor(
        "displayName",
        {
            header: "Tên",
            cell: ({ getValue }) => getValue(),
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
        "isVerified",
        {
            header: "Trạng thái",
            cell: ({ getValue }) => getValue() ? (
                <Badge className='text-xs px-0.5' intent="greenBold">Xác thực</Badge>
            ) : (
                <Badge className='text-xs px-0.5' intent="secondary">Chưa xác thực</Badge>
            ),
            minSize: 150,
        }
    ),
    accessor(
        "type",
        {
            header: "Quyền",
            cell: ({ getValue }) => <RoleBadge role={getValue()} />,
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
            cell: ({ row: { original } }) => <AccountDetail account={original} />,
            minSize: 150
        }
    )
]

const StoreAccount: FC = () => {
    const [loading, setLoading] = useState(false)
    const [accounts, setAccounts] = useState<Account[]>([])

    const fetchData = useCallback(async (page = 1, offset = 100) => {
        setLoading(true)

        const { status, body } = await ManageAccountService.search({ pagination: { page, offset } })

        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setAccounts(body.data.results)
        } else {
            setAccounts([])
        }
    }, [])
    const refetch = useCallback(async () => {
        fetchData()
    }, [fetchData])


    useEffect(() => {
        refetch()
    }, [refetch])

    // const updateQRCode = useCallback((id: string, qr: QRCode) => {
    //     setCodes(
    //         codes => {
    //             const updated = [...codes]
    //             const index = updated.findIndex((qr) => qr.id === id)
    //             updated.splice(index, 1, qr)
    //             return updated
    //         }
    //     )
    // }, [])

    // const addQRCode = useCallback((qr: QRCode) => {
    //     setCodes(codes => [...codes, qr])
    // }, [])

    // const refetch = useCallback(async () => {
    //     if (isEmpty(storeId)) {
    //         return
    //     }
    //     setLoading(true)

    //     const { status, body } = await QRService.getByStoreId(storeId)
    //     setLoading(false)

    //     if (status === 200 && !isEmpty(body) && Array.isArray(body.data)) {
    //         setCodes(body.data)
    //     } else {
    //         setCodes([])
    //     }
    // }, [storeId])

    // if (loading) {
    //     return (
    //         <div className='bg-white p-5 shadow rounded'>
    //             <div className="flex justify-center items-center space-x-1 p-2 text-xs">
    //                 <Loading.Circle className="text-main-primary" size={14} />
    //                 <span className="text-gray-400">Đang tải danh sách cửa hàng</span>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className="bg-white p-5 shadow rounded">
            {
                loading ? (
                    <TableSkeleton column={5} />
                ) : (
                    <Table<Account>
                        actions={
                            (
                                <div className='flex space-x-5'>
                                    <AddAccount />
                                </div>
                            )
                        }
                        columns={columns}
                        data={accounts}
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

export default StoreAccount