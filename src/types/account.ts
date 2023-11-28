import Base from "types/base"

export type Account = {
    id: string
    username: string
    displayName: string
    phone: string | null
    email: string
    isVerified: boolean
    avatar: string | null
    type: string
    isActive: boolean
    provider: string
    partnerId: string
    storeId: string | null
} & Base
