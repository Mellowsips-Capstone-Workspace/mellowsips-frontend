import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import { QRCode } from "types/store"

class QRService {

    static getByStoreId(storeId) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: QRCode[]
        }

        return requestApiHelper<body>(
            interceptor.get(`stores/${storeId}/qrcodes`)
        )
    }

    // static getById(id: string) {
    //     type body = {
    //         statusCode: number
    //         message: string | undefined
    //         errorCode: null | string
    //         data: Product
    //     }

    //     return requestApiHelper<body>(
    //         interceptor.get(`products/details/${id}`)
    //     )
    // }

    static create(storeId: string | undefined, payload: object) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: QRCode
        }

        return requestApiHelper<body>(
            interceptor.post(
                `stores/${storeId}/qrcodes`,
                payload
            )
        )
    }

    static update(id: string | undefined, payload: object) {
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: QRCode
        }

        return requestApiHelper<body>(
            interceptor.put(
                `qrcodes/${id}`,
                payload
            )
        )
    }



}

export default QRService