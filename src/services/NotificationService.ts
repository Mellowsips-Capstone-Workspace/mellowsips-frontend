import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { StompMessage } from "services/StompClientService"

class NotificationService {
    static getAll() {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: {
                results: StompMessage[]
                page: number
                itemsPerPage: number
                totalItems: number
            }
        }

        return requestApiHelper<body>(
            interceptor.post(
                "notifications/search",
                {
                    pagination: {
                        page: 1,
                        itemsPerPage: 100
                    }
                }
            )
        )
    }

    static markAllAsRead() {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
        }

        return requestApiHelper<body>(
            interceptor.put("notifications/mark-all-as-read")
        )
    }
    static markAsRead(id: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
        }

        return requestApiHelper<body>(
            interceptor.put(`notifications/${id}/mark-as-read`)
        )
    }
}

export default NotificationService