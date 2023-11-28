import { Product, ProductAddon } from "types/product"
import Store, { QRCode } from "types/store"

export type CartItem = {
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
    quantity: number
    note: string
    product: Product
    addons: ProductAddon[]
    tempPrice: number
    finalPrice: number
}
export type Order = {
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
    status: string
    finalPrice: number
    details: {
        id: string
        createdAt: string
        updatedAt: string
        createdBy: string
        updatedBy: string
        store: Store
        cartItems: CartItem[]
        tempPrice: number
        finalPrice: number
    }
    qrCode: QRCode
    latestTransaction: any | null // Bạn có thể thay "any" bằng kiểu dữ liệu phù hợp
}

export const OrderStatus = {
    CANCELED: "CANCELED",
    ORDERED: "ORDERED",
    REJECTED: "REJECTED",
    PROCESSING: "PROCESSING",
    COMPLETED: "COMPLETED",
    RECEIVED: "RECEIVED",
    DECLINED: "DECLINED",
    PENDING: "PENDING"
} as const
