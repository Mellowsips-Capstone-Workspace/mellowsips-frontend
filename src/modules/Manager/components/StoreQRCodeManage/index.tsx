import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import ROLE from 'enums/role'
import { isEmpty, isString } from 'lodash'
import Loading from 'modules/Common/Loading'
import SelectStoreManage from 'modules/Common/SelectStoreManage'
import useSelectStore from 'modules/Common/SelectStoreManage/hooks/useSelectStore'
import { TableSkeleton } from 'modules/Common/Skeleton'
import Table from 'modules/Common/Table'
import AddQRCode from 'modules/Manager/components/AddQRCode'
import QRCodeModel from 'modules/Manager/components/QRCode'
import { FC, useCallback, useEffect, useState } from 'react'
import QRService from 'services/QRService'
import { useAppSelector } from 'stores/root'
import { Principle } from 'types/authenticate'
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
    const { type, storeId: accountStoreId } = useAppSelector<Principle>(state => state.authenticate.principle!)
    const { loading: storeLoading, stores, storeId, setStoreId } = useSelectStore(null, true)
    const [loading, setLoading] = useState(false)
    const [codes, setCodes] = useState<QRCode[]>([])

    const fetchData = useCallback(async (storeId: string | null) => {
        if (isEmpty(storeId)) {
            setCodes([])
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
    }, [])

    useEffect(() => {
        if (!isString(storeId) && !isString(accountStoreId)) {
            return
        }
        const id = [ROLE.STAFF, ROLE.STORE_MANAGER].includes(type) ? accountStoreId : storeId

        fetchData(id!)
    }, [storeId, fetchData, type, accountStoreId])

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
        const id = [ROLE.STAFF, ROLE.STORE_MANAGER].includes(type) ? accountStoreId : storeId
        const { status, body } = await QRService.getByStoreId(id)
        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data)) {
            setCodes(body.data)
        } else {
            setCodes([])
        }
    }, [storeId, type, accountStoreId])

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
                                    {
                                        type === ROLE.OWNER ? (
                                            <AddQRCode
                                                storeId={storeId!}
                                                addQRCode={addQRCode}
                                            />
                                        ) : (
                                            <AddQRCode
                                                storeId={accountStoreId}
                                                addQRCode={addQRCode}
                                            />
                                        )
                                    }

                                    {
                                        type === ROLE.OWNER ? (
                                            <div className="w-80">
                                                <SelectStoreManage
                                                    stores={stores}
                                                    loading={false}
                                                    storeId={storeId}
                                                    setStoreId={setStoreId}
                                                />
                                            </div>
                                        ) : null
                                    }

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