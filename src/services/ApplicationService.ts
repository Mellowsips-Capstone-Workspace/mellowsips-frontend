import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { Application } from "types/application"

class ApplicationService {

    static getById(id: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Application
        }

        return requestApiHelper<body>(
            interceptor.get(`applications/${id}`)
        )
    }
}

export default ApplicationService