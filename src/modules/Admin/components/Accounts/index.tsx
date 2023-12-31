import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import usePagination from 'hooks/usePagination'
import { isEmpty } from 'lodash'
import AccountDetail from 'modules/Admin/components/AccountDetail'
import Badge from 'modules/Common/Badge'
import Keyword from 'modules/Common/Keyword'
import Pagination from 'modules/Common/Pagination/Pagination'
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
            cell: ({ getValue }) => <p className='truncate'>{getValue()}</p>,
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
            header: "Vai trò",
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
    const { page, offset, maxPage, setPagination, setPage } = usePagination({ page: 1, offset: 50 })
    const [keyword, setKeyword] = useState("")

    const fetchData = useCallback(async () => {
        setLoading(true)
        const { status, body } = await ManageAccountService.search({ pagination: { page, offset }, keyword })

        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setAccounts(body.data.results)
            setPagination({ page, maxResult: body.data.totalItems })
        } else {
            setAccounts([])
        }
    }, [keyword, page, offset, setPagination])

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

    return (
        <div className="bg-white p-5 shadow rounded">
            {
                loading ? (
                    <TableSkeleton column={5} />
                ) : (
                    <div className='space-y-5'>
                        <Table<AccountItem>
                            actions={
                                (
                                    <div className='w-72'>
                                        <Keyword keyword={keyword} setKeyword={setKeyword} />
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
        </div>
    )
}

export default Accounts