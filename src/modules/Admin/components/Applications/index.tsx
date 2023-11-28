import { createColumnHelper } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"
import usePagination from "hooks/usePagination"
import { isEmpty } from "lodash"
import ApplicationBadge from "modules/Common/ApplicationBadge"
import Pagination from "modules/Common/Pagination/Pagination"
import { TableSkeleton } from "modules/Common/Skeleton"
import Tab from "modules/Common/Tab"
import Table from "modules/Common/Table"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AdminApplicationService from "services/AdminApplicationService"
import { Application } from "types/application"

const { accessor, display } = createColumnHelper<Application>()

const columns = [
    accessor(
        "jsonData.organization.name",
        {
            header: "Người tạo đơn",
            cell: ({ getValue }) => getValue(),
            minSize: 250,
        }
    ),
    accessor(
        "type",
        {
            header: "Loại đơn",
            cell: ({ getValue }) => <ApplicationBadge.Type type={getValue()} />,
            minSize: 150,
        }
    ),
    accessor(
        "jsonData.organization.email",
        {
            header: "Email",
            cell: ({ getValue }) => getValue(),
            minSize: 150
        }
    ),
    accessor(
        "jsonData.organization.phone",
        {
            header: "Số điện thoại",
            cell: ({ getValue }) => getValue(),
            minSize: 150
        }
    ),
    accessor(
        "status",
        {
            header: "Trạng thái",
            cell: ({ getValue }) => <ApplicationBadge.Status status={getValue()} />,
            minSize: 150
        }
    ),
    accessor(
        "updatedAt",
        {
            header: "Lần cuối cập nhật",
            cell: ({ getValue }) => format(parseISO(getValue()), 'yyyy-MM-dd HH:mm:ss'),
            minSize: 150
        }
    ),
    accessor(
        "createdAt",
        {
            header: "Ngày tạo",
            cell: ({ getValue }) => format(parseISO(getValue()), 'yyyy-MM-dd HH:mm:ss'),
            minSize: 150
        }
    ),
    accessor(
        "jsonData.organization.businessType",
        {
            header: "Hình thức",
            cell: ({ getValue }) => <ApplicationBadge.Business type={getValue()} />,
            minSize: 150
        }
    ),
    accessor(
        "jsonData.merchant",
        {
            header: "Số lượng cửa hàng",
            cell: ({ getValue }) => getValue().length,
            minSize: 150
        }
    ),
    display(
        {
            header: "Hành động",
            cell: ({ row: { original } }) => {
                return (
                    <Link
                        to="view"
                        state={{ id: original.id }}
                        className="hover:text-main-primary"
                    >
                        Xem chi tiết
                    </Link>
                )
            },
            minSize: 150
        }
    )
]

const Applications = () => {
    const [loading, setLoading] = useState(false)
    const [applications, setApplications] = useState<Application[]>([])
    const [type, setType] = useState("CREATE_ORGANIZATION")
    const { page, offset, maxPage, setPagination, setPage } = usePagination({ offset: 10 })

    const refetch = useCallback(async (page = 1, offset = 10) => {
        setLoading(true)
        const { status, body } = await AdminApplicationService.search({ pagination: { page, offset } })
        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setApplications(body.data.results)
            setPagination({ page: page, maxResult: body.data.totalItems })
        } else {
            setApplications([])
        }
    }, [setPagination])

    useEffect(() => {
        refetch(page, offset)
    }, [refetch, page, offset])

    return (
        <div className="space-y-5">

            <div className="w-full px-5 bg-white rounded shadow">
                <Tab.Container
                    defaultValue={type}
                    onTabChange={setType}
                    className="flex space-x-5 scrollbar-none overflow-x-auto"
                >
                    <Tab.Item
                        displayValue="Đăng ký doanh nghiệp"
                        value="CREATE_ORGANIZATION"
                        className="flex-none font-medium py-4 border-b-2 border-transparent cursor-pointer aria-checked:text-main-primary aria-checked:border-b-main-primary transition-all duration-300"
                    />
                    <Tab.Item
                        displayValue="Yêu cầu cập nhật thông tin"
                        value=""
                        className="flex-none font-medium py-4 border-b-2 border-transparent cursor-pointer aria-checked:text-main-primary aria-checked:border-b-main-primary transition-all duration-300"
                    />
                </Tab.Container>
            </div>

            <div className="w-full p-5 space-y-5 bg-white rounded shadow">
                {
                    loading ? (
                        <TableSkeleton column={5} />
                    ) : (
                        <>
                            <Table<Application>
                                columns={columns}
                                data={applications}
                                refetch={refetch}
                                columnVisibility={
                                    {
                                        createdAt: false,
                                        "jsonData_merchant": false,
                                        "jsonData_organization.email": false,
                                        "jsonData_organization.phone": false
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

                        </>
                    )
                }
            </div>
        </div>

    )
}

export default Applications