import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { isEmpty } from "lodash"
import { Account } from "types/account"

class ManageAccountService {
    static search(
        options: {
            pagination: { page: number, offset: number }
            filter?: object
        }
    ) {
        const { pagination, filter } = options
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
                "users/search",
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