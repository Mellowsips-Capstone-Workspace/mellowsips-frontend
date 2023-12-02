import useBoolean from 'hooks/useBoolean'
import { isEmpty, isString } from 'lodash'
import Button from 'modules/Common/Button'
import DocumentPreview from 'modules/Common/Document'
import Loading from 'modules/Common/Loading'
import Modal from 'modules/Common/Modal/Modal'
import OrderBadge from 'modules/Common/OrderBadge'
import showToast from 'modules/Common/Toast'
import { FC, useCallback, useState } from 'react'
import OrderService from 'services/OrderService'
import { Order, OrderStatus } from 'types/order'

type OrderDetailProps = {
    order: Order & Order & {
        updateOrder: (id: string, order: Order) => void
    }
}

const OrderDetail: FC<OrderDetailProps> = ({ order }) => {
    const { id, updateOrder } = order
    const [display, setDisplay] = useBoolean(false)
    const [displayConfirm, setDisplayConfirm] = useBoolean(false)
    const [displayConfirmComplete, setDisplayConfirmComplete] = useBoolean(false)
    const { on, off } = setDisplay
    const { off: offConfirm } = setDisplayConfirm
    const [submitting, setSubmitting] = useState(false)

    const handlePrintOrder = () => {
        const { origin } = location
        const url = origin.concat("/print/bill?id=", order.id)
        localStorage.setItem(order.id, JSON.stringify(order))

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
                    message: "Huỷ bỏ đơn hàng thất bại."
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
        updateOrder(id, body.data)
        offConfirm()
    }, [id, offConfirm, updateOrder])

    const handleProcessingOrder = useCallback(async () => {
        setSubmitting(true)
        const { status, body } = await OrderService.changeStatus(id, "process")
        setSubmitting(false)

        if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
            showToast(
                {
                    type: "error",
                    title: "Thất bại",
                    message: "Chuyển trạng thái đơn hàng thất bại."
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
        updateOrder(id, body.data)
        offConfirm()
    }, [id, offConfirm, updateOrder])

    const handleConfirmReceiveOrder = useCallback(async () => {
        setSubmitting(true)
        const { status, body } = await OrderService.changeStatus(id, "receive")
        setSubmitting(false)

        if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
            showToast(
                {
                    type: "error",
                    title: "Thất bại",
                    message: "Chuyển trạng thái đơn hàng thất bại."
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
        updateOrder(id, body.data)
        offConfirm()
    }, [id, offConfirm, updateOrder])

    const handleCompleteOrder = useCallback(async () => {
        setSubmitting(true)
        const { status, body } = await OrderService.changeStatus(id, "complete")
        setSubmitting(false)

        if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
            showToast(
                {
                    type: "error",
                    title: "Thất bại",
                    message: "Chuyển trạng thái đơn hàng thất bại."
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
        updateOrder(id, body.data)
        offConfirm()
    }, [id, offConfirm, updateOrder])

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
                    <p className="text-xl truncate font-medium">Thông tin đơn hàng</p>
                    <div className='w-fit h-fit'>
                        <OrderBadge status={order.status} />
                    </div>
                </div>
                <div className='p-5 space-y-5'>
                    <div className='space-y-2'>
                        <div className='flex items-center space-x-2'>
                            <p>Quán:</p>
                            <span>{order.details.store.name}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <p>Vị trí:</p>
                            <span>{order.qrCode.name}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <p>Hình thức:</p>
                            {
                                order.initialTransactionMethod === "ZALO_PAY" ? (
                                    <div className='flex space-x-1 justify-center'>
                                        <img className='h-5 w-5 inline-block border rounded' src="/images/zalo-pay.png" />
                                        <span className='text-sm text-indigo-500'>
                                            Zalo Pay
                                        </span>
                                    </div>
                                ) : (
                                    <div className='flex space-x-1 justify-center text-purple-700'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                        </svg>

                                        <span className='text-sm'>
                                            Tiền Mặt
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                        <div className='flex items-center space-x-2'>
                            <p>Tạm tính:</p>
                            <span className='text-gray-500'>{order.details.tempPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                        </div>

                        {
                            order.details.vouchers.length ? (
                                <div className='flex items-start space-x-2'>
                                    <p>Khuyến mãi:</p>
                                    <div>
                                        {
                                            order.details.vouchers.map(
                                                voucher => (
                                                    <p key={voucher.id} className='text-gray-500'> -{voucher.discountAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                            ) : null
                        }
                        <div className='flex items-center space-x-2'>
                            <p>Tổng:</p>
                            <span className='text-main-primary font-medium'>{order.details.finalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                        </div>

                    </div>
                    <hr />
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
                                onClick={handleCompleteOrder}
                                disabled={submitting}
                                className='disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
                            >
                                Xác nhận hoàn thành
                            </Button>
                        ) : null
                    }
                    {
                        order.status === OrderStatus.COMPLETED ? (
                            <Button
                                type="button"
                                variant="green"
                                onClick={order.initialTransactionMethod === "ZALO_PAY" ? handleConfirmReceiveOrder : setDisplayConfirmComplete.on}
                                disabled={submitting}
                                className='disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
                            >
                                Xác nhận đã nhận
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
            <Modal
                flag={displayConfirmComplete}
                closeModal={setDisplayConfirmComplete.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <div className='space-y-5'>
                    <p className="px-5 py-1 shadow border-b truncate font-medium">Xác nhận khách hàng đã thanh toán</p>
                    <div className='space-y-5'>
                        <p className='px-5'>Đơn hàng được thanh toán bằng hình thức tiền mặt.<span className='font-medium text-red-500'> Xác nhận đã thanh toán.</span></p>
                        <div className="border-t py-2 px-5 flex justify-end space-x-5">
                            <Button
                                type="button"
                                variant="indigo"
                                onClick={
                                    () => {
                                        handleConfirmReceiveOrder()
                                        setDisplayConfirmComplete.off()
                                    }
                                }
                                disabled={submitting}
                                className='disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
                            >
                                <span className='hidden group-disabled:block mr-2'>
                                    <Loading.Circle size={14} />
                                </span>
                                <span>Xác nhận</span>
                            </Button>
                            <Button
                                type="button"
                                variant="default"
                                onClick={setDisplayConfirmComplete.off}
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