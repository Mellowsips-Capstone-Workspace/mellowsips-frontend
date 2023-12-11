import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { isEmpty } from "lodash"
import { Order, OrderStatus } from "types/order"

class OrderService {

    static search(
        options: {
            pagination: { page: number, offset: number },
            status?: string[]
            order?: string
            filter?: object
        }
    ) {
        const {
            pagination,
            status = [
                OrderStatus.PROCESSING,
                OrderStatus.RECEIVED,
                OrderStatus.REJECTED,
                OrderStatus.ORDERED,
                OrderStatus.COMPLETED
            ],
            order = "DESC",
            filter = {}
        } = options

        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: {
                results: Order[]
                page: number
                itemsPerPage: number
                totalItems: number
            }
        }

        return requestApiHelper<body>(
            interceptor.post(
                "orders/search",
                {
                    pagination: {
                        page: pagination.page,
                        itemsPerPage: pagination.offset
                    },
                    criteria: {
                        filter: {
                            status,
                            ...filter
                        },
                        order: {
                            createdAt: order
                        }
                    }
                }
            )
        )
    }

    static changeStatus(
        orderId: string,
        status: string,
        reason?: string
    ) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Order
        }

        const url = "orders/".concat(orderId).concat("/events/").concat(status)

        return requestApiHelper<body>(
            interceptor.put(url, { reason: isEmpty(reason) ? "" : reason })
        )
    }

    static requestTransaction(
        orderId: string
    ) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: {
                id: string
            }
        }

        return requestApiHelper<body>(
            interceptor.post(
                "orders/".concat(orderId).concat("/transactions")
            )
        )
    }

    static completeTransaction(
        transactionId: string
    ) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
        }

        return requestApiHelper<body>(
            interceptor.put(
                "transactions/".concat(transactionId).concat("/pay")
            )
        )
    }
}

export default OrderService