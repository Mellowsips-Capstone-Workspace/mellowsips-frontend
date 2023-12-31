import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { isEmpty } from "lodash"
import { Voucher } from "types/voucher"

class VoucherService {

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
                results: Voucher[]
                page: number
                itemsPerPage: number
                totalItems: number
            }
        }

        return requestApiHelper<body>(
            interceptor.post(
                "vouchers/search",
                {
                    pagination: {
                        page: pagination.page,
                        itemsPerPage: pagination.offset
                    },
                    criteria: {
                        keyword: isEmpty(keyword) ? "" : keyword
                    }
                }
            )
        )
    }


    static create(payload: object) {

        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Voucher
        }

        return requestApiHelper<body>(
            interceptor.post(
                "vouchers",
                payload
            )
        )
    }

    static update(id: string, payload: object) {

        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Voucher
        }

        return requestApiHelper<body>(
            interceptor.put(
                "vouchers/".concat(id),
                payload
            )
        )
    }
    static close(id: string) {

        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Voucher
        }

        return requestApiHelper<body>(
            interceptor.put(
                "vouchers/".concat(id).concat("/close")
            )
        )
    }
}

export default VoucherService