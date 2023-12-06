import { createColumnHelper } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"
import ROLE from "enums/role"
import usePagination from "hooks/usePagination"
import { isEmpty } from "lodash"
import Badge from "modules/Common/Badge"
import Pagination from "modules/Common/Pagination/Pagination"
import SelectStoreManage from "modules/Common/SelectStoreManage"
import useSelectStore from "modules/Common/SelectStoreManage/hooks/useSelectStore"
import { TableSkeleton } from "modules/Common/Skeleton"
import Table from "modules/Common/Table"
import AddMenu from "modules/Manager/components/AddMenu"
import { FC, useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MenuService from "services/MenuService"
import { useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"
import { Menu } from "types/menus"

const { accessor, display } = createColumnHelper<Menu>()

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
            cell: ({ getValue }) => getValue() ? <Badge className="text-xs px-1" intent={"greenBold"}>Hiển thị</Badge> : <Badge className="text-xs px-1" intent={"redBold"}>Tạm ẩn</Badge>,
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
            cell: ({ row: { original } }) => {
                return (
                    <Link
                        state={{ id: original.id }}
                        to={original.id!}
                        className="hover:text-main-primary"
                    >
                        Chi tiết
                    </Link>
                )
            },
            minSize: 150
        }
    )
]

const Menus: FC = () => {
    const [loading, setLoading] = useState(false)
    const [menus, setMenus] = useState<Menu[]>([])
    const { page, offset, maxPage, setPagination, setPage } = usePagination()
    const { storeId, setStoreId, stores, loading: loadingStores } = useSelectStore(null, false)
    const { type } = useAppSelector<Principle>(state => state.authenticate.principle!)

    const refetch = useCallback(async (page = 1, offset = 10) => {
        setLoading(true)

        const { status, body } = type === ROLE.OWNER ? await MenuService.search({ pagination: { page, offset }, filter: { storeId } }) : await MenuService.search({ pagination: { page, offset } })

        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setMenus(body.data.results)
            setPagination({ page, maxResult: body.data.totalItems })
        } else {
            setMenus([])
        }
    }, [setPagination, type, storeId])

    useEffect(() => {
        refetch(page, offset)
    }, [refetch, page, offset])

    return (
        <div className="w-full p-5 space-y-5 bg-white rounded shadow">
            {
                loading ? (
                    <TableSkeleton column={5} />
                ) : (
                    <>
                        <Table<Menu>
                            data={menus}
                            columns={columns}
                            refetch={refetch}
                            actions={
                                (
                                    <div className="flex space-x-5">
                                        <AddMenu refetch={refetch} />
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
                    </>
                )
            }
        </div>
    )
}

export default Menus