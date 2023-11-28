import Base from "types/base"

export type DocumentModel = {
    id: string
    name: string
    content: string
    fileType: string
    size: number
    reference?: string
    referenceType?: string
} & Base