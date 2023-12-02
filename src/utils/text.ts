import { isNumber } from "lodash"
import showToast from "modules/Common/Toast"

export const copyToClipboard = async (text: string, successMessage?: string) => {
    if (!navigator.clipboard) {
        showToast(
            {
                type: "warning",
                title: "Cảnh báo",
                message: "Clipboard not supported!"
            }
        )
        return
    }
    try {
        await navigator.clipboard.writeText(text)
        showToast(
            {
                type: "success",
                title: "Thành công",
                message: successMessage || "Thao tác copy vào khay nhớ thành công!"
            }
        )
    } catch {
        showToast(
            {
                type: "error",
                title: "Thất bại",
                message: "Thao tác copy vào khay nhớ thất bại."
            }
        )
    }
}

export const toCurrency = (price: number | string) => isNumber(price) ? price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : Number(price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })