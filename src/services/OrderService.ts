import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { Order, OrderStatus } from "types/order"

class OrderService {

    static search(
        options: {
            pagination: { page: number, offset: number },
            status?: string[]
            order?: string
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
            order = "DESC"
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
                            status
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
        status: string
    ) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Order
        }

        return requestApiHelper<body>(
            interceptor.put(
                "orders/".concat(orderId).concat("/events/").concat(status)
            )
        )
    }
}

export default OrderService