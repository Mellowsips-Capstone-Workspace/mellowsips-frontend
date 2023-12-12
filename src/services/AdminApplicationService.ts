import interceptor from "apis/interceptor";
import { APPLICATION_EVENT, APPLICATION_STATUS } from "enums/application";
import { requestApiHelper } from "helpers/api";
import ApplicationService from "services/ApplicationService";
import { Application } from "types/application";

class AdminApplicationService extends ApplicationService {
    static search(
        options: {
            pagination: { page: number, offset: number }
        },
        type: string
    ) {
        const { pagination } = options
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: {
                results: Application[]
                page: number
                itemsPerPage: number
                totalItems: number
            }
        }

        return requestApiHelper<body>(
            interceptor.post(
                "applications/search",
                {
                    pagination: {
                        page: pagination.page,
                        itemsPerPage: pagination.offset
                    },
                    criteria: {
                        filter: {
                            type,
                            status: [APPLICATION_STATUS.WAITING, APPLICATION_STATUS.REJECTED, APPLICATION_STATUS.APPROVED, APPLICATION_STATUS.PROCESSING]
                        },
                        order: {
                            createdAt: "DESC"
                        }
                    }
                }
            )
        )
    }
    static transition(
        applicationId: string,
        event: typeof APPLICATION_EVENT.APPROVE | typeof APPLICATION_EVENT.PROCESS | typeof APPLICATION_EVENT.REJECT,
        payload?: object
    ) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Application
        }

        return requestApiHelper<body>(
            interceptor.put(
                `applications/${applicationId}/events/${event}`,
                payload
            )
        )
    }

}

export default AdminApplicationService