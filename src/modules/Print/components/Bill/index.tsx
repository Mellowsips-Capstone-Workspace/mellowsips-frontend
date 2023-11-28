import { format } from "date-fns";
import CryptoLocalStorageHelper from "helpers/storage";
import { isEmpty } from "lodash";
import Button from "modules/Common/Button";
import ErrorBoundary from "modules/Common/ErrorBoundary/ErrorBoundary";
import LogoFull from "modules/Common/LogoFull";
import OrderBadge from "modules/Common/OrderBadge";
import QRCode from "modules/Common/QRCode";
import { useCallback } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { Order } from "types/order";

const PrintBill = () => {
    const [params] = useSearchParams()
    const payload = params.get("data")

    const handlePrint = useCallback(() => {
        window.print()
    }, [])

    if (payload === null) {
        return <Navigate to="/" replace={true} />
    }

    const order: Order = JSON.parse(CryptoLocalStorageHelper.decodeDataURI(payload)) as Order
    const note = order.details.cartItems.filter(item => !isEmpty(item.note)).map(({ note }) => note).join(". ")

    return (
        <ErrorBoundary>
            <div className="w-fit mx-auto py-2 print:hidden">
                <LogoFull height={30} disable={true} />
            </div>
            <div className="max-w-full w-max mx-auto space-y-1 border p-5 rounded print:border-0 print:w-full print:mx-0">
                <p className="print:text-black text-main-primary uppercase font-semibold text-center">{order.details.store.name}</p>
                <div className="w-20 mx-auto">
                    <QRCode showAction={false} data={`https://mellowsipssv.site/mobile?storeId=${order.details.store.id}&qrId=${order.qrCode.id}`} />
                </div>
                <p className="uppercase font-semibold text-center">Phiếu thanh toán</p>
                <hr></hr>
                <div className="space-y-1">
                    <div className="flex space-x-1">
                        <span className="flex-none text-xs print:text-print font-medium">KH:</span>
                        <p className="text-xs print:text-print">{order.createdBy}</p>
                    </div>
                    <div className="flex space-x-1">
                        <span className="flex-none text-xs print:text-print font-medium">SĐT:</span>
                        <p className="text-xs print:text-print">{order.createdBy}</p>
                    </div>
                    <div className="flex space-x-1">
                        <span className="flex-none text-xs print:text-print font-medium">Bàn:</span>
                        <p className="text-xs print:text-print">{order.qrCode.name}</p>
                    </div>
                    <div className="flex space-x-1">
                        <span className="flex-none text-xs print:text-print font-medium">Ngày:</span>
                        <p className="text-xs print:text-print">{format(new Date(order.createdAt), "HH:mm dd/MM/yyyy")}</p>
                    </div>
                    <div className="flex space-x-1">
                        <span className="flex-none text-xs print:text-print font-medium">ĐC:</span>
                        <p className="text-xs print:text-print">{order.details.store.address}</p>
                    </div>
                    <div className="flex space-x-1">
                        <span className="flex-none text-xs print:text-print font-medium">Phương thức:</span>
                        <p className="text-xs print:text-print">{order.initialTransactionMethod === "ZALO_PAY" ? "Zalo Pay" : "Tiền mặt"}</p>
                    </div>
                </div>
                <hr></hr>
                <div className="py-5 space-y-1">
                    <div className="flex space-x-1">
                        <div className="grow">
                            <p className="flex-none text-xs print:text-print font-medium">Món</p>
                        </div>
                        <div className="flex-none w-6">
                            <p className="flex-none text-xs print:text-print font-medium">SL</p>
                        </div>
                        <div className="flex-none w-14">
                            <p className="flex-none text-xs print:text-print font-medium">Giá</p>
                        </div>
                    </div>
                    <ul className="space-y-1">
                        {
                            order.details.cartItems.map(
                                item => (
                                    <li
                                        key={item.id}
                                        className="py-0.5 flex space-x-1 border-b"
                                    >
                                        <div className="grow">
                                            <p className="text-xs print:text-print">
                                                <span>{item.product.name}</span>
                                                {
                                                    Array.isArray(item.addons) && item.addons.length > 0 ? (
                                                        <span>({item.addons.map(addon => addon.name).join(", ")})</span>
                                                    ) : null
                                                }
                                            </p>
                                        </div>
                                        <div className="flex-none w-6">
                                            <p className="text-xs print:text-print">{item.quantity}</p>
                                        </div>
                                        <div className="flex-none w-14">
                                            <p className="text-xs print:text-print">{item.finalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
                                        </div>
                                    </li>
                                )
                            )
                        }

                        <div className="py-0.5 flex space-x-1 justify-end">
                            <div className="flex-none w-10">
                                <p className="flex-none text-xs print:text-print font-medium">Tổng</p>
                            </div>
                            <div className="flex-none w-20">
                                <p className="flex-none text-xs print:text-print font-medium">{order.finalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
                            </div>
                        </div>
                    </ul>
                    <hr></hr>
                    <div className="space-y-1 py-1">
                        <div className="flex space-x-1">
                            <span className="flex-none text-xs print:text-print font-medium">Trạng thái:</span>
                            <OrderBadge status={order.status} />
                        </div>
                        <div className="flex space-x-1">
                            <span className="flex-none text-xs print:text-print font-medium">Ghi chú:</span>

                            <span className="text-xs print:text-print">
                                {
                                    isEmpty(note) ? "#" : note
                                }
                            </span>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="space-y-2">
                        <div className="w-8">
                            <QRCode showAction={false} data={window.location.origin} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs print:text-print open: italic">{window.location.host}</p>
                            <p className="text-xs print:text-print open: italic">© 2023 Melow Swips. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-fit mx-auto py-5 print:hidden">
                <Button
                    type="button"
                    variant="indigo"
                    className="w-40 space-x-2"
                    onClick={handlePrint}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                    </svg>
                    <span>
                        In hoá đơn
                    </span>
                </Button>
            </div>
        </ErrorBoundary>
    )
}

export default PrintBill