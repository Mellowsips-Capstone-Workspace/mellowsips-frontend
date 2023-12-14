import { createColumnHelper } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"
import usePagination from "hooks/usePagination"
import { isEmpty } from "lodash"
import Badge from "modules/Common/Badge"
import DocumentPreview from "modules/Common/Document"
import Keyword from "modules/Common/Keyword"
import Pagination from "modules/Common/Pagination/Pagination"
import { TableSkeleton } from "modules/Common/Skeleton"
import Table from "modules/Common/Table"
import ProductAction, { ProductItem } from "modules/Manager/components/Products/components/ProductAction"
import { FC, useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProductService from "services/ProductService"
import { Product } from "types/product"

const { accessor, display } = createColumnHelper<ProductItem>()

const columns = [
    display(
        {
            header: "Sản phẩm",
            cell: ({ row: { original } }) => {
                return (
                    (
                        <div className="h-14 flex space-x-2 items-center max-w-full overflow-hidden">
                            <div className="h-14 w-14 flex-none">
                                <DocumentPreview displayFileName={false} loadingMessage={false} documentId={original.coverImage} />
                            </div>
                            <p className="truncate">{original.name}</p>
                        </div>
                    )
                )
            },
            minSize: 150
        }
    ),
    accessor(
        "price",
        {
            header: "Giá",
            cell: ({ getValue }) => getValue().toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
            minSize: 150,
        }
    ),
    accessor(
        "isSoldOut",
        {
            header: "Trạng thái",
            cell: ({ getValue }) => getValue() ? <Badge intent={"redBold"} className="px-1 py-0.5 text-sm">Tạm hết</Badge> : <Badge intent={"greenBold"} className="px-1 py-0.5 text-sm">Còn hàng</Badge>,
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
            cell: ({ row: { original } }) => <ProductAction product={original} />,
            minSize: 150
        }
    )
]

const Products: FC = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const { page, offset, maxPage, setPagination, setPage } = usePagination()
    const [keyword, setKeyword] = useState("")

    const refetch = useCallback(async (page = 1, offset = 10) => {
        setLoading(true)

        const { status, body } = await ProductService.searchTemplates({ pagination: { page, offset }, keyword })
        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setProducts(body.data.results)
            setPagination({ page, maxResult: body.data.totalItems })
        } else {
            setProducts([])
        }
    }, [setPagination, keyword])

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
                        <Table<ProductItem>
                            actions={
                                (
                                    <div className="flex space-x-5">
                                        <Link className="px-5 py-1.5 rounded bg-main-primary text-white" to="create">Thêm mới </Link>
                                        <div className="w-72">
                                            <Keyword keyword={keyword} setKeyword={setKeyword} />
                                        </div>
                                    </div>
                                )
                            }
                            columns={columns}
                            data={products.map(product => ({ ...product, refetch: () => refetch(page, offset) }))}
                            refetch={refetch}
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

export default Products