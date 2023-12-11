import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { isEmpty } from "lodash"
import { Menu } from "types/menus"

class MenuService {

    static search(
        options: {
            pagination: { page: number, offset: number }
            filter?: object
            keyword: string
        }
    ) {
        const { pagination, filter, keyword } = options
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

        let criteria: object = {
            order: {
                createdAt: "DESC"
            }
        }

        if (!isEmpty(filter)) {
            criteria = {
                ...criteria,
                filter
            }
        }

        if (!isEmpty(keyword)) {
            criteria = {
                ...criteria,
                keyword
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
                    criteria
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

    static delete(id: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
        }

        return requestApiHelper<body>(
            interceptor.delete(`menus/${id}`)
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