import CryptoLocalStorageHelper from 'helpers/storage'
import useBoolean from 'hooks/useBoolean'
import { isEmpty, isString } from 'lodash'
import Button from 'modules/Common/Button'
import DocumentPreview from 'modules/Common/Document'
import Loading from 'modules/Common/Loading'
import Modal from 'modules/Common/Modal/Modal'
import OrderBadge from 'modules/Common/OrderBadge'
import showToast from 'modules/Common/Toast'
import { OrdersContext } from 'modules/Manager/components/Orders/context/OrderContext'
import { FC, useCallback, useContext, useState } from 'react'
import OrderService from 'services/OrderService'
import { Order, OrderStatus } from 'types/order'

type OrderDetailProps = {
    order: Order
    index: number
}

const OrderDetail: FC<OrderDetailProps> = ({ order, index }) => {
    const { id } = order
    const [display, setDisplay] = useBoolean(false)
    const [displayConfirm, setDisplayConfirm] = useBoolean(false)
    const { on, off } = setDisplay
    const { off: offConfirm } = setDisplayConfirm
    const { updateOrder } = useContext(OrdersContext)!
    const [submitting, setSubmitting] = useState(false)

    const handlePrintOrder = () => {
        const { origin } = location
        const url = origin.concat("/print/bill?data=", CryptoLocalStorageHelper.encodeDataURI(JSON.stringify(order)))

        window.open(
            url,
            'popup',
            'width=+width+'
        )
    }

    const handleCancelOrder = useCallback(async () => {
        setSubmitting(true)
        const { status, body } = await OrderService.changeStatus(id, "reject")
        setSubmitting(false)

        if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
            showToast(
                {
                    type: "error",
                    title: "Thất bại",
                    message: "Huỷ bỏ đơn hàng thât bại."
                }
            )
            return
        }

        showToast(
            {
                type: "success",
                title: "Thành công",
                message: "Đơn hàng được huỷ thành công."
            }
        )
        updateOrder(index, body.data)
        offConfirm()
    }, [id, index, offConfirm, updateOrder])

    const handleProcessingOrder = useCallback(async () => {
        setSubmitting(true)
        const { status, body } = await OrderService.changeStatus(id, "process")
        setSubmitting(false)

        if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
            showToast(
                {
                    type: "error",
                    title: "Thất bại",
                    message: "Chuyển trạng thái đơn hàng thât bại."
                }
            )
            return
        }

        showToast(
            {
                type: "success",
                title: "Thành công",
                message: "Chuyển trạng thái thành công."
            }
        )
        updateOrder(index, body.data)
        offConfirm()
    }, [id, index, offConfirm, updateOrder])

    const handleDeliveryOrder = useCallback(async () => {
        setSubmitting(true)
        const { status, body } = await OrderService.changeStatus(id, "complete")
        setSubmitting(false)

        if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
            showToast(
                {
                    type: "error",
                    title: "Thất bại",
                    message: "Chuyển trạng thái đơn hàng thât bại."
                }
            )
            return
        }

        showToast(
            {
                type: "success",
                title: "Thành công",
                message: "Chuyển trạng thái thành công."
            }
        )
        updateOrder(index, body.data)
        offConfirm()
    }, [id, index, offConfirm, updateOrder])

    return (

        <div className='min-w-full space-x-2 px-5 text-left'>
            <span
                className="hover:text-main-primary cursor-pointer"
                onClick={on}
            >
                Chi tiết
            </span>

            {
                [OrderStatus.RECEIVED as string, OrderStatus.COMPLETED as string].includes(order.status) ? (
                    <span
                        className="text-gray-500 hover:text-indigo-500 transition-all cursor-pointer"
                        onClick={handlePrintOrder}
                    >
                        Hoá đơn
                    </span>
                ) : null
            }

            <Modal
                flag={display}
                closeModal={off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
                innerClassName="max-w-5xl w-screen flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <div className='flex justify-between px-5 py-2 shadow border-b'>
                    <p className=" truncate font-medium">Thông tin đơn hàng</p>
                    <div className='w-fit h-fit'>
                        <OrderBadge status={order.status} />
                    </div>
                </div>
                <div className='p-5 space-y-5'>
                    {
                        order.details.cartItems.map(
                            ({ id, addons, note, product, quantity }) => (
                                <div
                                    key={id}
                                    className="flex space-x-5"
                                >
                                    <div className='h-14 w-14 flex-none'>
                                        <DocumentPreview
                                            documentId={product.coverImage}
                                            loadingMessage={false}
                                            displayFileName={false}
                                        />
                                    </div>

                                    <div>
                                        <p className='space-x-1 text-gray-500 text-sm'>
                                            <span>{product.name}</span>
                                            <span className='text-main-primary text-xs'>(x{quantity})</span>
                                        </p>
                                        {
                                            addons.length ? (
                                                <p className='space-x-1 text-sm'>
                                                    <span className='text-gray-500'>Tuỳ chọn:</span>
                                                    <span>{addons.map(addon => addon.name).join(", ")}</span>
                                                </p>
                                            ) : null
                                        }
                                        {
                                            isString(note) && note.length ? (
                                                <p className='space-x-1 text-sm'>
                                                    <span className='text-gray-500'>Ghi chú:</span>
                                                    <span>{note}</span>
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
                <div className="border-t py-2 px-5 flex justify-end space-x-5">
                    {
                        [OrderStatus.RECEIVED as string, OrderStatus.COMPLETED as string].includes(order.status) ? (
                            <Button
                                type="button"
                                variant="indigo"
                                className="w-40 space-x-2"
                                onClick={handlePrintOrder}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                                </svg>
                                <span>
                                    In hoá đơn
                                </span>
                            </Button>
                        ) : null
                    }
                    {
                        order.status === OrderStatus.ORDERED ? (
                            <Button
                                type="button"
                                variant="indigo"
                                onClick={handleProcessingOrder}
                                disabled={submitting}
                                className='disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
                            >
                                Tiếp nhận
                            </Button>
                        ) : null
                    }
                    {
                        order.status === OrderStatus.PROCESSING ? (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleDeliveryOrder}
                                disabled={submitting}
                                className='disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
                            >
                                Xác nhận hoàn thành
                            </Button>
                        ) : null
                    }

                    {
                        OrderStatus.ORDERED === order.status ? (
                            <Button
                                type="button"
                                variant="red"
                                disabled={submitting}
                                className='disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
                                onClick={setDisplayConfirm.on}
                            >
                                Huỷ đơn
                            </Button>
                        ) : null
                    }
                    <Button
                        type="button"
                        variant="default"
                        onClick={setDisplay.off}
                    >
                        Đóng
                    </Button>
                </div>
            </Modal >
            <Modal
                flag={displayConfirm}
                closeModal={setDisplayConfirm.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <div className='space-y-5'>
                    <p className="px-5 py-1 shadow border-b truncate font-medium">Xác nhận huỷ đơn hàng</p>
                    <div className='space-y-5'>
                        <p className='px-5'>Đơn hàng sẽ bị huỷ bỏ.<span className='font-medium text-red-500'>Xác nhận huỷ đơn.</span></p>
                        <div className="border-t py-2 px-5 flex justify-end space-x-5">
                            <Button
                                type="button"
                                variant="red"
                                onClick={handleCancelOrder}
                                disabled={submitting}
                                className='disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
                            >
                                <span className='hidden group-disabled:block mr-2'>
                                    <Loading.Circle size={14} />
                                </span>
                                <span>Xác nhận huỷ</span>
                            </Button>
                            <Button
                                type="button"
                                variant="default"
                                onClick={setDisplayConfirm.off}
                            >
                                Đóng
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default OrderDetail