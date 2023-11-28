import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import { isEmpty } from 'lodash'
import Loading from 'modules/Common/Loading'
import SelectStoreManage from 'modules/Common/SelectStoreManage'
import useSelectStore from 'modules/Common/SelectStoreManage/hooks/useSelectStore'
import { TableSkeleton } from 'modules/Common/Skeleton'
import Table from 'modules/Common/Table'
import AddQRCode from 'modules/Manager/components/AddQRCode'
import QRCodeModel from 'modules/Manager/components/QRCode'
import { FC, useCallback, useState } from 'react'
import QRService from 'services/QRService'
import { QRCode } from 'types/store'

type QRCodeItem = QRCode & {

    updateQRCode: (id: string, qr: QRCode) => void
}

const { accessor, display } = createColumnHelper<QRCodeItem>()

const columns = [
    accessor(
        "name",
        {
            header: "Tên mã",
            cell: ({ getValue }) => getValue(),
            minSize: 150,
        }
    ),
    accessor(
        "code",
        {
            header: "Mã",
            cell: ({ getValue }) => getValue(),
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
            cell: ({ row: { original } }) => <QRCodeModel {...original} />,
            minSize: 150
        }
    )
]

const StoreQRCodeManage: FC = () => {
    const { loading: storeLoading, stores, storeId, setStoreId } = useSelectStore()
    const [loading, setLoading] = useState(false)
    const [codes, setCodes] = useState<QRCode[]>([])

    const fetchData = useCallback(async (storeId: string) => {
        setLoading(true)

        const { status, body } = await QRService.getByStoreId(storeId)
        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data)) {
            setCodes(body.data)
        } else {
            setCodes([])
        }
    }, [])

    const updateQRCode = useCallback((id: string, qr: QRCode) => {
        setCodes(
            codes => {
                const updated = [...codes]
                const index = updated.findIndex((qr) => qr.id === id)
                updated.splice(index, 1, qr)
                return updated
            }
        )
    }, [])

    const addQRCode = useCallback((qr: QRCode) => {
        setCodes(codes => [...codes, qr])
    }, [])

    const refetch = useCallback(async () => {
        if (isEmpty(storeId)) {
            return
        }
        setLoading(true)

        const { status, body } = await QRService.getByStoreId(storeId)
        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data)) {
            setCodes(body.data)
        } else {
            setCodes([])
        }
    }, [storeId])

    if (storeLoading) {
        return (
            <div className='bg-white p-5 shadow rounded'>
                <div className="flex justify-center items-center space-x-1 p-2 text-xs">
                    <Loading.Circle className="text-main-primary" size={14} />
                    <span className="text-gray-400">Đang tải danh sách cửa hàng</span>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white p-5 shadow rounded">
            {
                loading ? (
                    <TableSkeleton column={5} />
                ) : (
                    <Table<QRCodeItem>
                        actions={
                            (
                                <div className='flex space-x-5'>
                                    <AddQRCode
                                        storeId={storeId}
                                        addQRCode={addQRCode}
                                    />
                                    <div className="w-60">
                                        <SelectStoreManage
                                            stores={stores}
                                            loading={false}
                                            storeId={storeId}
                                            setStoreId={setStoreId}
                                            onStoreChange={fetchData}
                                        />
                                    </div>
                                </div>
                            )
                        }
                        columns={columns}
                        data={codes.map(code => ({ ...code, updateQRCode }))}
                        refetch={refetch}
                    />
                )
            }
        </div>
    )
}

export default StoreQRCodeManage