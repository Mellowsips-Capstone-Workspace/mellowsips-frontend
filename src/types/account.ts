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


export type Partner = {
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
    name: string | null
    logo: string | null
    businessCode: string | null
    taxCode: string | null
    type: 'PERSONAL'
    businessIdentityIssueDate: string | null
    businessIdentityImages: string[] | null
}