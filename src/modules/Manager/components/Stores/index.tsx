import { createColumnHelper } from '@tanstack/react-table'
import usePagination from 'hooks/usePagination'
import { isEmpty } from 'lodash'
import Badge from 'modules/Common/Badge'
import Pagination from 'modules/Common/Pagination/Pagination'
import { TableSkeleton } from 'modules/Common/Skeleton'
import Table from 'modules/Common/Table'
import { FC, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ManageStoreService from 'services/ManageStoreService'
import Store from 'types/store'

const { accessor, display } = createColumnHelper<Store>()

const columns = [
    display(
        {
            header: "Hành động",
            cell: ({ row: { original } }) => {
                return (
                    <Link
                        state={{ id: original.id }}
                        to={original.id}
                        relative="path"
                        className="hover:text-main-primary"
                    >
                        Chi tiết
                    </Link>
                )
            },
            minSize: 150
        }
    ),
    accessor(
        "name",
        {
            header: "Tên cửa hàng",
            cell: ({ getValue }) => getValue(),
            minSize: 150,
        }
    ),
    accessor(
        "address",
        {
            header: "Địa chỉ",
            cell: ({ getValue }) => getValue(),
            minSize: 150,
        }
    ),
    accessor(
        "email",
        {
            header: "Email",
            cell: ({ getValue }) => getValue(),
            minSize: 150
        }
    ),
    accessor(
        "phone",
        {
            header: "Số điện thoại",
            cell: ({ getValue }) => getValue(),
            minSize: 150
        }
    ),
    accessor(
        "isActive",
        {
            header: "Trạng thái",
            cell: ({ getValue }) => getValue() ? (
                <Badge intent="green" className='text-xs px-1 py-0.5'>Đang hoạt động</Badge>
            ) : (
                <Badge intent="secondary" className='text-xs px-1 py-0.5'>Chưa sẵn sàng</Badge>
            ),
            minSize: 150
        }
    )
]
const Stores: FC = () => {
    const [loading, setLoading] = useState(false)
    const [stores, setStores] = useState<Store[]>([])
    const { page, offset, maxPage, setPagination, setPage } = usePagination()

    const refetch = useCallback(async (page = 1, offset = 10) => {
        setLoading(true)
        const { status, body } = await ManageStoreService.search({ pagination: { page, offset } })
        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setStores(body.data.results)
            setPagination({ page, maxResult: body.data.totalItems })
        } else {
            setStores([])
        }
    }, [setPagination])

    useEffect(() => {
        refetch(page, offset)
    }, [refetch, page, offset])

    return (
        <div className="w-full p-5 space-y-5 bg-white rounded shadow">
            {
                loading ? (
                    <TableSkeleton column={5} />
                ) : <Table<Store>
                    columns={columns}
                    data={stores}
                    refetch={refetch}
                />
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

export default Stores