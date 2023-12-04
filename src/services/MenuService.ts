import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { Menu } from "types/menus"

class MenuService {

    static search(
        options: {
            pagination: { page: number, offset: number }
        }
    ) {
        const { pagination } = options
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: {
                results: Menu[]
                page: number
                itemsPerPage: number
                totalItems: number
            }
        }

        return requestApiHelper<body>(
            interceptor.post(
                "menus/search",
                {
                    pagination: {
                        page: pagination.page,
                        itemsPerPage: pagination.offset
                    },
                    criteria: {
                        order: {
                            createdAt: "DESC"
                        }
                    }
                }
            )
        )
    }

    static getById(id: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Menu
        }

        return requestApiHelper<body>(
            interceptor.get(`menus/${id}`)
        )
    }

    static create(payload: object) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Menu
        }

        return requestApiHelper<body>(
            interceptor.post(
                "menus",
                payload
            )
        )
    }

    static update(id: string, payload: object) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Menu
        }

        return requestApiHelper<body>(
            interceptor.put(
                "menus/".concat(id),
                payload
            )
        )
    }

}

export default MenuService