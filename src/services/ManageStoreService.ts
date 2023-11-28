import interceptor from "apis/interceptor"
import { requestApiHelper } from "helpers/api"
import StoreService from "services/StoreService"
import Store from "types/store"

class ManageStoreService extends StoreService {

    static search(
        options: {
            pagination: { page: number, offset: number }
        }
    ) {
        const { pagination } = options
        type body = {
            statusCode: number
            message: string | undefined
            errorCode: null | string
            data: {
                results: Store[]
                page: number
                itemsPerPage: number
                totalItems: number
            }
        }

        return requestApiHelper<body>(
            interceptor.post(
                "stores/search",
                {
                    pagination: {
                        page: pagination.page,
                        itemsPerPage: pagination.offset
                    }
                }
            )
        )
    }
}

export default ManageStoreService