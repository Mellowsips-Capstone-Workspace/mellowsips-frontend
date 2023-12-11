import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import ROLE from 'enums/role'
import usePagination from 'hooks/usePagination'
import { isEmpty } from 'lodash'
import Badge from 'modules/Common/Badge'
import Keyword from 'modules/Common/Keyword'
import Pagination from 'modules/Common/Pagination/Pagination'
import RoleBadge from 'modules/Common/RoleBadge'
import SelectStoreManage from 'modules/Common/SelectStoreManage'
import useSelectStore from 'modules/Common/SelectStoreManage/hooks/useSelectStore'
import { TableSkeleton } from 'modules/Common/Skeleton'
import Table from 'modules/Common/Table'
import AccountDetail, { AccountItem } from 'modules/Manager/components/AccountDetail'
import AddAccount from 'modules/Manager/components/AddAccount'
import { FC, useCallback, useEffect, useState } from 'react'
import ManageAccountService from 'services/ManageAccountService'
import { useAppSelector } from 'stores/root'
import { Account } from 'types/account'
import { Principle } from 'types/authenticate'

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
            header: "Xác thực",
            cell: ({ getValue }) => getValue() ? (
                <Badge className='text-xs px-0.5' intent="greenBold">Xác thực</Badge>
            ) : (
                <Badge className='text-xs px-0.5' intent="secondary">Chưa xác thực</Badge>
            ),
            minSize: 150,
        }
    ),
    accessor(
        "isActive",
        {
            header: "Trạng thái",
            cell: ({ getValue }) => getValue() ? (
                <Badge className='text-xs px-0.5' intent="green">Kích hoạt</Badge>
            ) : (
                <Badge className='text-xs px-0.5' intent="secondaryBold">Bị vô hiệu hoá</Badge>
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

const StoreAccount: FC = () => {
    const [loading, setLoading] = useState(false)
    const [accounts, setAccounts] = useState<Account[]>([])
    const { storeId, setStoreId, stores, loading: loadingStores } = useSelectStore(null, false)
    const { type } = useAppSelector<Principle>(state => state.authenticate.principle!)
    const { page, offset, maxPage, setPagination, setPage } = usePagination()
    const [keyword, setKeyword] = useState("")

    const fetchData = useCallback(async () => {
        setLoading(true)

        const { status, body } = type === ROLE.OWNER ? await ManageAccountService.search({ pagination: { page, offset }, filter: { storeId }, keyword }) : await ManageAccountService.search({ pagination: { page, offset }, keyword })

        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setAccounts(body.data.results)
            setPagination({ page: body.data.page, maxResult: body.data.totalItems })

        } else {
            setAccounts([])
        }
    }, [storeId, type, setPagination, keyword, page, offset])

    const refetch = useCallback(async () => {
        fetchData()
    }, [fetchData])

    useEffect(() => {
        refetch()
    }, [refetch])

    const updateAccount = useCallback((account: Account) => {
        const { id } = account
        setAccounts(
            (accounts) => {
                const cloneAccounts = [...accounts]
                const index = cloneAccounts.findIndex(account => account.id === id)
                cloneAccounts.splice(index, 1, account)
                return cloneAccounts
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
                                    <div className='flex space-x-5'>
                                        <AddAccount refetch={refetch} />
                                        <div className='w-72'>
                                            <Keyword keyword={keyword} setKeyword={setKeyword} />
                                        </div>
                                        {
                                            type === ROLE.OWNER ? (
                                                <div className='w-72'>
                                                    <SelectStoreManage
                                                        stores={stores}
                                                        storeId={storeId}
                                                        loading={loadingStores}
                                                        setStoreId={setStoreId}
                                                        showSelectAll={true}
                                                    />
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                )
                            }
                            columns={columns}
                            data={accounts.map(account => ({ ...account, updateAccount }))}
                            refetch={refetch}
                            columnVisibility={
                                {
                                    updatedAt: false,
                                    updatedBy: false,
                                    phone: false
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

export default StoreAccount