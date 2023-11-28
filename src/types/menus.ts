import { Product } from "types/product"

export type Menu = {
    id: string | null
    name: string
    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
    isActive: boolean
    partnerId: string | null
    storeId: string | null
    menuSections: MenuSection[]
}

export type MenuSection = {
    name: string
    productIds: string[]
    products: Product[]
    priority: number
}