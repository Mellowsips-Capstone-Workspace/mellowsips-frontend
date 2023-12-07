import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import Store from "types/store"

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

    static getStoreReview(id: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: any
        }

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
                        page: 1,
                        itemsPerPage: 10
                    }
                }
            )
        )
    }
}

export default StoreService