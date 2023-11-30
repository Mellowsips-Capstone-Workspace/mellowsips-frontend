import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { Product } from "types/product"

class ProductService {

    static search(
        options: {
            pagination: { page: number, offset: number },

        }
    ) {
        const { pagination } = options
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

        return requestApiHelper<body>(
            interceptor.post(
                "products/search",
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