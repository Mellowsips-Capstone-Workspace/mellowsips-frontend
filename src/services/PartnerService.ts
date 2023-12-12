import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { Partner } from "types/account"

class PartnerService {

    static getById(id: string) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: Partner

        }

        return requestApiHelper<body>(
            interceptor.get("partners/".concat(id))
        )
    }
}

export default PartnerService