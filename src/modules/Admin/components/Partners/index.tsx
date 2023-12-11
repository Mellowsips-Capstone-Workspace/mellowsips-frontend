import { createColumnHelper } from '@tanstack/react-table'
import usePagination from 'hooks/usePagination'
import { isEmpty } from 'lodash'
import { Business } from 'modules/Common/ApplicationBadge'
import Keyword from 'modules/Common/Keyword'
import Pagination from 'modules/Common/Pagination/Pagination'
import { TableSkeleton } from 'modules/Common/Skeleton'
import Table from 'modules/Common/Table'
import { FC, useCallback, useEffect, useState } from 'react'
import AdminPartnerService from 'services/AdminPartnerService'
import { Partner } from 'types/account'



const { accessor } = createColumnHelper<Partner>()

const columns = [
    accessor(
        "name",
        {
            header: "Tên",
            cell: ({ getValue }) => getValue() || <span className='text-gray-400'>Trống</span>,
            minSize: 150,
        }
    ),
    accessor(
        "updatedBy",
        {
            header: "Cập nhật bởi",
            cell: ({ getValue }) => getValue() || <span className='text-gray-400'>Trống</span>,
            minSize: 150,
        }
    ),
    accessor(
        "taxCode",
        {
            header: "Mã thuế",
            cell: ({ getValue }) => getValue() || <span className='text-gray-400'>Trống</span>,
            minSize: 150,
        }
    ),
    accessor(
        "type",
        {
            header: "Hình thức",
            cell: ({ getValue }) => <Business type={getValue()} />,
            minSize: 150,
        }
    ),

]

const Partners: FC = () => {
    const [loading, setLoading] = useState(false)
    const [partners, setPartners] = useState<Partner[]>([])
    const { page, offset, maxPage, setPagination, setPage } = usePagination()
    const [keyword, setKeyword] = useState("")

    const fetchData = useCallback(async () => {
        setLoading(true)
        const { status, body } = await AdminPartnerService.search({ pagination: { page, offset }, keyword })
        setLoading(false)
        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setPartners(body.data.results)
            setPagination({ page, maxResult: body.data.totalItems })
        } else {
            setPartners([])
        }
    }, [page, offset, setPagination, keyword])

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
                    <div className='space-y-5'>

                        <Table<Partner>
                            actions={
                                (
                                    <div className='w-72'>
                                        <Keyword keyword={keyword} setKeyword={setKeyword} />
                                    </div>
                                )
                            }
                            columns={columns}
                            data={partners}
                            refetch={refetch}
                            columnVisibility={
                                {
                                    updatedAt: false
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

export default Partners