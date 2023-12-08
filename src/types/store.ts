import Base from "types/base"

export type DaySchedule = {
    start: string
    end: string
}

export type OperationalHours = {
    MONDAY?: DaySchedule[]
    TUESDAY?: DaySchedule[]
    WEDNESDAY?: DaySchedule[]
    THURSDAY?: DaySchedule[]
    FRIDAY?: DaySchedule[]
    SATURDAY?: DaySchedule[]
    SUNDAY?: DaySchedule[]
}

export type QRCode = {
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
    name: string
    storeId: string
    code: string
}

type Store = {
    id: string
    name: string
    phone: string
    email: string
    address: string
    profileImage: string
    coverImage: string
    categories: string[]
    isActive: boolean
    isOpen: boolean
    operationalHours: OperationalHours
    partnerId: string
} & Base


export type Review = {
    id: string
    point: number
    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
    comment: string
}

export default Store
