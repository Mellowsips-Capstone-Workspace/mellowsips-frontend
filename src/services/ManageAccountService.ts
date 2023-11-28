import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { Account } from "types/account"

class ManageAccountService {
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
                results: Account[]
                page: number
                itemsPerPage: number
                totalItems: number
            }
        }

        return requestApiHelper<body>(
            interceptor.post(
                "users/search",
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

    static create(payload: any) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Account
        }

        return requestApiHelper<body>(
            interceptor.post(
                "users",
                payload
            )
        )
    }


    static disable(id: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Account
        }

        return requestApiHelper<body>(
            interceptor.put(
                `users/${id}/deactivate`
            )
        )
    }

    static active(id: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Account
        }

        return requestApiHelper<body>(
            interceptor.put(
                `users/${id}/activate`
            )
        )
    }
}

export default ManageAccountService