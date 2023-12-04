import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import { isEmpty } from 'lodash'
import AccountDetail from 'modules/Admin/components/AccountDetail'
import AddAccount from 'modules/Admin/components/AddAccount'
import Badge from 'modules/Common/Badge'
import RoleBadge from 'modules/Common/RoleBadge'
import { TableSkeleton } from 'modules/Common/Skeleton'
import Table from 'modules/Common/Table'
import { FC, useCallback, useEffect, useState } from 'react'
import ManageAccountService from 'services/ManageAccountService'
import { Account } from 'types/account'

type AccountItem = Account & {
    updateAccount: (id: string, account: Account) => void
}

const { accessor, display } = createColumnHelper<AccountItem>()

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
        "username",
        {
            header: "Tên đăng nhập",
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
        "isVerified",
        {
            header: "Trạng thái",
            cell: ({ getValue }) => getValue() ? (
                <Badge className='text-xs px-0.5' intent="greenBold">Xác thực</Badge>
            ) : (
                <Badge className='text-xs px-0.5' intent="secondaryBold">Chưa xác thực</Badge>
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

const Accounts: FC = () => {
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

    const updateAccount = useCallback((id: string, account: Account) => {
        setAccounts(
            accounts => {
                const updated = [...accounts]
                const index = updated.findIndex((account) => account.id === id)
                updated.splice(index, 1, account)
                return updated
            }
        )
    }, [])

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
                    <Table<AccountItem>
                        actions={
                            (
                                <div className='flex space-x-5'>
                                    <AddAccount />
                                </div>
                            )
                        }
                        columns={columns}
                        data={
                            accounts.map(
                                account => (
                                    {
                                        ...account,
                                        updateAccount
                                    }
                                )
                            )
                        }
                        refetch={refetch}
                        columnVisibility={
                            {
                                updatedAt: false,
                                updatedBy: false,
                                type: false,
                                provider: false
                            }
                        }
                    />
                )
            }
        </div>
    )
}

export default Accounts