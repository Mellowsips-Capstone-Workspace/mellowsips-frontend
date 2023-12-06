import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import ROLE from 'enums/role'
import { isEmpty } from 'lodash'
import Badge from 'modules/Common/Badge'
import RoleBadge from 'modules/Common/RoleBadge'
import SelectStoreManage from 'modules/Common/SelectStoreManage'
import useSelectStore from 'modules/Common/SelectStoreManage/hooks/useSelectStore'
import { TableSkeleton } from 'modules/Common/Skeleton'
import Table from 'modules/Common/Table'
import AccountDetail from 'modules/Manager/components/AccountDetail'
import AddAccount from 'modules/Manager/components/AddAccount'
import { FC, useCallback, useEffect, useState } from 'react'
import ManageAccountService from 'services/ManageAccountService'
import { useAppSelector } from 'stores/root'
import { Account } from 'types/account'
import { Principle } from 'types/authenticate'


const { accessor, display } = createColumnHelper<Account>()

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
    const { storeId, setStoreId, stores, loading: loadingStores } = useSelectStore()
    const { type } = useAppSelector<Principle>(state => state.authenticate.principle!)


    const fetchData = useCallback(async (page = 1, offset = 100) => {
        setLoading(true)

        const { status, body } = type === ROLE.OWNER ? await ManageAccountService.search({ pagination: { page, offset }, filter: { storeId } }) : await ManageAccountService.search({ pagination: { page, offset } })

        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setAccounts(body.data.results)
        } else {
            setAccounts([])
        }
    }, [storeId, type])

    const refetch = useCallback(async () => {
        fetchData()
    }, [fetchData])


    useEffect(() => {
        refetch()
    }, [refetch])


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
                                    {
                                        type === ROLE.OWNER ? (
                                            <div className='w-80'>
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