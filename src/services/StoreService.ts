import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import Store, { Review } from "types/store"

class StoreService {

    static getById(id: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Store
        }

        return requestApiHelper<body>(
            interceptor.get(`stores/${id}`)
        )
    }

    static activeStore(id: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Store
        }

        return requestApiHelper<body>(
            interceptor.put(`stores/${id}/activate`)
        )
    }

    static inactiveStore(id: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Store
        }

        return requestApiHelper<body>(
            interceptor.put(`stores/${id}/deactivate`)
        )
    }

    static updateStore(id: string, data: any) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Store
        }

        return requestApiHelper<body>(
            interceptor.put(
                `stores/${id}/update`,
                data
            )
        )
    }

    static getStoreReview(
        id: string,
        options: {
            pagination: { page: number, offset: number }
        }
    ) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: {
                itemsPerPage: number
                page: number
                results: Review[]
                totalItems: number
            }
        }

        const { pagination } = options

        return requestApiHelper<body>(
            interceptor.post(
                `stores/${id}`.concat("/reviews/search"),
                {
                    criteria: {
                        order: {
                            createdAt: "DESC"
                        }
                    },
                    pagination: {
                        page: pagination.page,
                        itemsPerPage: pagination.offset
                    }
                }
            )
        )
    }
}

export default StoreService