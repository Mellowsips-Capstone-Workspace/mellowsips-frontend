export const VOUCHER_TYPE = {
    CASH: "CASH",
    PERCENT: "PERCENT"
}

export type Voucher = {
    value: number
    quantity: number
    originalQuantity: number
    discountType: "CASH" | "PERCENT"
    startDate: string
    endDate: string
    maxUsesPerUser: number
    maxDiscountAmount: number
    minOrderAmount: number
    code: string
    partnerId: string
    storeId: string | null
} & {
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
}