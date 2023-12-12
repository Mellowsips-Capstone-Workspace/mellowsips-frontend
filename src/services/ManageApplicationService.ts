import interceptor from "apis/interceptor"
import { APPLICATION_EVENT } from "enums/application"
import { requestApiHelper } from "helpers/api"
import ApplicationService from "services/ApplicationService"
import { Application } from "types/application"

class ManageApplicationService extends ApplicationService {

    static search(
        options: {
            pagination: { page: number, offset: number }
            type: string
        }
    ) {
        const { pagination, type } = options
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
                            type
                        },
                        order: {
                            createdAt: "DESC"
                        }
                    }
                }
            )
        )
    }
    static create(application: object) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Application
        }

        return requestApiHelper<body>(
            interceptor.post(
                "applications",
                application
            )
        )
    }

    static edit(id: string, application: object) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
        }

        return requestApiHelper<body>(
            interceptor.put(
                `applications/${id}`,
                application
            )
        )
    }

    static transition(
        applicationId: string,
        event: typeof APPLICATION_EVENT.AMEND | typeof APPLICATION_EVENT.SUBMIT,
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

export default ManageApplicationService