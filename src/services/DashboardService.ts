import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { Product } from "types/product"

class DashboardService {
    static getBusinessStatistics(payload: any) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: {
                usedVoucherAmount: number
                flakedOrderAmount: number
                successOrderAmount: number
                amountForStores: [
                    {
                        amount: number,
                        storeId: string
                        name: string
                    }
                ],
                pendingVoucherAmount: number
                pendingOrderAmount: number
            }
        }

        return requestApiHelper<body>(
            interceptor.post(
                "dashboard/business/statistics",
                payload
            )
        )
    }

    static getTopProduct(
        options: {
            pagination: { page: number, offset: number }
            filter: any,

        }
    ) {
        const { pagination, filter } = options
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: {
                results: (
                    Product & {
                        numberOfPurchases: number
                    }
                )[]
            }
        }

        return requestApiHelper<body>(
            interceptor.post(
                "products/purchases",
                {
                    pagination: {
                        page: pagination.page,
                        itemsPerPage: pagination.offset
                    },
                    criteria: {
                        filter,
                        order: "DESC"
                    }
                }
            )
        )
    }

    static getAdminDashboard(payload: any) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: any
        }

        return requestApiHelper<body>(
            interceptor.post(
                "dashboard/system/statistics",
                payload
            )
        )
    }

}

export default DashboardService