import Base from "types/base"

export type Product = {
    id: string | null
    name: string
    price: number
    coverImage: string
    description: string | null
    categories: string[]
    isSoldOut: boolean
    partnerId: string
    storeId: string
    productOptionSections: ProductOptionSection[]
} & Base

export type ProductOptionSection = {
    id: string
    name: string
    priority: number
    isRequired: boolean
    maxAllowedChoices: number
    productAddons: ProductAddon[]
}

export type ProductAddon = {
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
    name: string
    price: number
    isSoldOut: boolean
} & Base
