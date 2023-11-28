import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"

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
}

export default DashboardService