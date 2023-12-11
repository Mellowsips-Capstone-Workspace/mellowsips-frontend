import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { isEmpty } from "lodash"
import { Partner } from "types/account"

class AdminPartnerService {

    static search(
        options: {
            pagination: { page: number, offset: number }
            keyword?: string
        }
    ) {
        const { pagination, keyword } = options
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: {
                results: Partner[]
                page: number
                itemsPerPage: number
                totalItems: number
            }
        }

        return requestApiHelper<body>(
            interceptor.post(
                "partners/search",
                {
                    criteria: {
                        keyword: isEmpty(keyword) ? "" : keyword,
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

export default AdminPartnerService