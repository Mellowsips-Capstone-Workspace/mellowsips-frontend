import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { isEmpty } from "lodash"
import { Product } from "types/product"

class ProductService {

    static searchTemplates(
        options: {
            pagination: { page: number, offset: number },
            filter?: object
        }
    ) {
        const { pagination, filter } = options
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: {
                results: Product[]
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

        return requestApiHelper<body>(
            interceptor.post(
                "products/templates/search",
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

    static getMenuProducts(menuId: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Product[]
        }

        return requestApiHelper<body>(
            interceptor.get(`menus/${menuId}/products`)
        )
    }

    static getById(id: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Product
        }

        return requestApiHelper<body>(
            interceptor.get(`products/details/${id}`)
        )
    }

    static create(payload: object) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Product
        }

        return requestApiHelper<body>(
            interceptor.post(
                "products",
                payload
            )
        )
    }

    static update(id: string, payload: object) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Product
        }

        return requestApiHelper<body>(
            interceptor.put(
                "products/".concat(id),
                payload
            )
        )
    }

}

export default ProductService
