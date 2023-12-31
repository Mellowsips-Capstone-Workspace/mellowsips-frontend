import { createColumnHelper } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"
import ROLE from "enums/role"
import usePagination from "hooks/usePagination"
import { isEmpty } from "lodash"
import Badge from "modules/Common/Badge"
import Keyword from "modules/Common/Keyword"
import Pagination from "modules/Common/Pagination/Pagination"
import SelectStoreManage from "modules/Common/SelectStoreManage"
import useSelectStore from "modules/Common/SelectStoreManage/hooks/useSelectStore"
import { TableSkeleton } from "modules/Common/Skeleton"
import Table from "modules/Common/Table"
import AddMenu from "modules/Manager/components/AddMenu"
import MenuAction, { MenuItem } from "modules/Manager/components/Menus/components/MenuAction"
import { FC, useCallback, useEffect, useState } from "react"
import MenuService from "services/MenuService"
import { useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"
import { Menu } from "types/menus"


const { accessor, display } = createColumnHelper<MenuItem>()

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
            cell: ({ row: { original } }) => <MenuAction menu={original} />,
            minSize: 150
        }
    )
]

const Menus: FC = () => {
    const [keyword, setKeyword] = useState("")
    const [loading, setLoading] = useState(false)
    const [menus, setMenus] = useState<Menu[]>([])
    const { page, offset, maxPage, setPagination, setPage } = usePagination()
    const { storeId, setStoreId, stores, loading: loadingStores } = useSelectStore(null, false)
    const { type } = useAppSelector<Principle>(state => state.authenticate.principle!)

    const refetch = useCallback(async (page = 1, offset = 10) => {
        setLoading(true)
        const { status, body } = type === ROLE.OWNER ? await MenuService.search({ pagination: { page, offset }, filter: { storeId }, keyword }) : await MenuService.search({ pagination: { page, offset }, keyword })
        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setMenus(body.data.results)
            setPagination({ page, maxResult: body.data.totalItems })
        } else {
            setMenus([])
        }
    }, [setPagination, type, storeId, keyword])

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
                        <Table<MenuItem>
                            data={menus.map(menu => ({ ...menu, refetch: () => refetch(page, offset) }))}
                            columns={columns}
                            refetch={refetch}
                            actions={
                                (
                                    <div className="flex space-x-5">
                                        <AddMenu refetch={refetch} />
                                        <div className="w-72">
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